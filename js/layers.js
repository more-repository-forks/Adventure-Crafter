const COLORS = [{
	name: "red",
	hex: "#ff0000",
	costBase: 0,
	earnings: 5,
	time: 3,
}, {
	name: "orange",
	hex: "#ff8800",
	costBase: 32,
	earnings: 500,
	time: 6,
}, {
	name: "yellow",
	hex: "#ffff00",
	dark: true,
	costBase: 64,
	earnings: 25000,
	time: 12,
}, {
	name: "lime",
	hex: "#88ff00",
	dark: true,
	costBase: 96,
	earnings: 2.5e6,
	time: 24,
}, {
	name: "green",
	hex: "#00ff00",
	dark: true,
	costBase: 128,
	earnings: 500e6,
	time: 48,
}, {
	name: "clover",
	hex: "#00ff88",
	dark: true,
	costBase: 164,
	earnings: 50e9,
	time: 96,
}, {
	name: "cyan",
	hex: "#00ffff",
	dark: true,
	costBase: 200,
	earnings: 5e12,
	time: 192,
}]; // future colors: azure, blue, violet, fuchsia, magenta

function registerColorCost(index, bulk) {
	const BUYNUM = (index + 1) * 10 + 1;
	const AMOUNT = getBuyableAmount("c", BUYNUM);
	let bulkCost = new Decimal(tmp.c.buyables[BUYNUM].cost || layers.c.buyables[BUYNUM].cost());
	for (let num = 1; num < bulk; num++) {
		bulkCost = bulkCost.add(layers.c.buyables[BUYNUM].cost(AMOUNT.add(num)));
	};
	COLORS[index].bulkLocation = AMOUNT;
	COLORS[index].bulkCost[bulk] = bulkCost;
};

function getColorBulk() {
	if (getClickableState("c", 11) == "5x") return 5;
	else return 1;
};

function getColorCost(index) {
	const BUYNUM = (index + 1) * 10 + 1;
	const AMOUNT = getBuyableAmount("c", BUYNUM);
	const BULK = getColorBulk();
	if (BULK === 1) {
		return tmp.c.buyables[BUYNUM].cost || layers.c.buyables[BUYNUM].cost();
	} else {
		if (COLORS[index].bulkLocation !== AMOUNT || !COLORS[index].bulkCost) {
			COLORS[index].bulkCost = {};
		};
		if (!COLORS[index].bulkCost[BULK]) {
			registerColorCost(index, BULK);
		};
		return COLORS[index].bulkCost[BULK];
	};
};

function getColorTabContent() {
	let content = [["display-text", "You have <h2 class='rainbowvalue-text'>" + formatWhole(player.c.colors) + "</h2> colors unlocked"]];
	if (tmp.c.clickables[11].unlocked) {
		content.push("blank");
		content.push("clickables");
		content.push("blank");
	} else {
		content.push("blank");
	};
	for (let index = 0; index <= player.c.colors && index < COLORS.length; index++) {
		const NAME = COLORS[index].name;
		content.push(["row", [
			["display-text", "<b class='sidetext' style='color:" + COLORS[index].hex + "'>" + NAME.toUpperCase()],
			["bar", NAME + "Prog"],
			["blank", ["5px", "5px"]],
			["bar", NAME + "Bar"],
			["blank", ["5px", "5px"]],
			["column", [
				["bar", NAME + "Buy"],
				["blank", ["5px", "5px"]],
				["buyable", (index + 1) * 10 + 1],
		]]]]);
		content.push("blank");
	};
	return content;
};

function getColorBars() {
	let bars = {};
	for (let index = 0; index < COLORS.length; index++) {
		const NAME = COLORS[index].name;
		const HEX = COLORS[index].hex;
		const BUYNUM = (index + 1) * 10 + 1;
		bars[NAME + "Bar"] = {
			direction: RIGHT,
			width: 300,
			height: 50,
			progress() { return player.c.time[NAME] || 0 },
			display() { if (getBuyableAmount("c", BUYNUM).gt(0) && player.c.earnings[NAME]) return "coins/cycle: " + illionFormat(player.c.earnings[NAME]) },
			fillStyle: {"background-color": HEX},
			borderStyle: {"border-color": HEX},
			style: {"color": (COLORS[index].dark ? "#999999" : "#ffffff")},
			unlocked() { return player.c.colors >= index },
		};
		bars[NAME + "Buy"] = {
			direction: LEFT,
			width: 171,
			height: 21,
			progress() {
				const COST = getColorCost(index);
				if (COST.eq(0)) return new Decimal(1);
				else return player.points.div(COST);
			},
			display() {
				if (this.progress().gte(1)) return illionFormat(100) + "%";
				else return illionFormat(this.progress().mul(100)) + "%";
			},
			fillStyle: {"background-color": HEX},
			borderStyle: {"border-color": HEX},
			style: {"color": (COLORS[index].dark ? "#999999" : "#ffffff")},
			unlocked() { return player.c.colors >= index },
		};
		bars[NAME + "Prog"] = {
			direction: UP,
			width: 60,
			height: 60,
			progress() {
				const AMOUNT = getBuyableAmount("c", BUYNUM);
				if (AMOUNT.lt(10)) goal = 10;
				else if (AMOUNT.lt(25)) goal = 25;
				else if (AMOUNT.lt(50)) goal = 50;
				else if (AMOUNT.lt(100)) goal = 100;
				else if (AMOUNT.lt(150)) goal = 150;
				else goal = 200;
				return AMOUNT.div(goal);
			},
			display() {
				return "<h1 style='font-family: Flavors'>" + formatWhole(getBuyableAmount("c", BUYNUM));
			},
			fillStyle: {"background-color": HEX},
			borderStyle: {"border-color": HEX},
			style: {"color": (COLORS[index].dark ? "#999999" : "#ffffff"), "border-radius": "50%"},
			unlocked() { return player.c.colors >= index },
		};
	};
	return bars;
};

function getColorBuyables() {
	let buyables = {};
	for (let index = 0; index < COLORS.length; index++) {
		const HEX = COLORS[index].hex;
		const BUYNUM = (index + 1) * 10 + 1;
		const DIVNUM = 302 + index;
		buyables[BUYNUM] = {
			cost(x) {
				let amt = new Decimal(COLORS[index].costBase).add(x);
				let divnum = new Decimal(1);
				if (getGridData("m", DIVNUM)) divnum = divnum.mul(getGridData("m", DIVNUM));
				return amt.div(2).pow(2).add(new Decimal(1.32).pow(amt.pow(0.9))).div(divnum);
			},
			bulkBuy() {
				if (getClickableState("c", 11) == "5x") return 5;
				else return 1;
			},
			canAfford() { return player.points.gte(getColorCost(index)) && getBuyableAmount("c", BUYNUM).lt(this.purchaseLimit) },
			purchaseLimit: 200,
			buy() {
				player.points = player.points.sub(getColorCost(index));
				addBuyables("c", BUYNUM, getColorBulk());
			},
			display() {
				let buyText = "Cost";
				if (getBuyableAmount("c", BUYNUM).eq(0) && getColorBulk() === 1) buyText = "Unlock";
				return "<h3 style='color:" + HEX + "'>" + buyText + ": " + illionFormat(getColorCost(index), true) + " coins";
			},
			style: {"background-color": (COLORS[index].dark ? "#999999" : "#ffffff")},
			unlocked() { return player.c.colors >= index },
		};
	};
	return buyables;
};

addLayer("c", {
	name: "Colors",
	symbol: "<span class='rainbowline-backround'></span>",
	noborder: true,
	position: 0,
	startData() { return {
		unlocked: true,
		colors: 0,
		colorBest: 0,
		earnings: [],
		time: [],
	}},
	color: "#ffffff",
	tooltip() { return formatWhole(player.c.colors) + " colors" },
	row: 0,
	layerShown() { return true },
	doReset(resettingLayer) {
		let keep = [];
		if (resettingLayer == "m") keep.push("colorBest");
		if (layers[resettingLayer].row > this.row) layerDataReset("c", keep);
		player.c.earnings = [];
		player.c.time = [];
	},
	update(diff) {
		// update unlocks
		if (getBuyableAmount("c", 61).gt(0)) player.c.colors = 6;
		else if (getBuyableAmount("c", 51).gt(0)) player.c.colors = 5;
		else if (getBuyableAmount("c", 41).gt(0)) player.c.colors = 4;
		else if (getBuyableAmount("c", 31).gt(0)) player.c.colors = 3;
		else if (getBuyableAmount("c", 21).gt(0)) player.c.colors = 2;
		else if (getBuyableAmount("c", 11).gt(0)) player.c.colors = 1;
		else player.c.colors = 0;
		// update best
		if (player.c.colors > player.c.colorBest) player.c.colorBest = player.c.colors;
		// calculate earnings
		for (let index = 0; index < player.c.colors; index++) {
			const NAME = COLORS[index].name;
			const BUYNUM = (index + 1) * 10 + 1;
			const MULTNUM = 102 + index;
			let earnings = getBuyableAmount("c", BUYNUM).mul(COLORS[index].earnings);
			if (getBuyableAmount("c", BUYNUM).gte(10)) earnings = earnings.mul(2.5);
			if (getBuyableAmount("c", BUYNUM).gte(25)) earnings = earnings.mul(5);
			if (getBuyableAmount("c", BUYNUM).gte(50)) earnings = earnings.mul(10);
			if (getBuyableAmount("c", BUYNUM).gte(100)) earnings = earnings.mul(50);
			if (getBuyableAmount("c", BUYNUM).gte(150)) earnings = earnings.mul(250);
			if (getGridData("m", MULTNUM)) earnings = earnings.mul(getGridData("m", MULTNUM));
			player.c.earnings[NAME] = earnings;
		};
		// earn
		for (let index = 0; index < player.c.colors; index++) {
			const NAME = COLORS[index].name;
			if (!player.c.time[NAME]) {
				player.c.time[NAME] = new Decimal(0);
			} else if (player.c.time[NAME].gt(1)) {
				player.points = player.points.add(player.c.earnings[NAME]);
				player.c.time[NAME] = new Decimal(0);
			};
		};
		// add time
		for (let index = 0; index < player.c.colors; index++) {
			const NAME = COLORS[index].name;
			const MULTNUM = 202 + index;
			let speed = new Decimal(diff);
			if (getGridData("m", MULTNUM)) speed = speed.mul(getGridData("m", MULTNUM));
			player.c.time[NAME] = player.c.time[NAME].add(speed.div(COLORS[index].time));
		};
	},
	tabFormat: {
		"Colors": {
			content: getColorTabContent,
			buttonClass: "rainbowvalue-text",
		},
		"Upgrades": {
			content: [
				["display-text", function() {
					return "You have <h2 class='rainbowvalue-text'>" + formatWhole(player.c.colors) + "</h2> colors unlocked";
				}],
				"blank",
				"upgrades",
			],
			buttonClass: 'rainbowvalue-text',
		},
	},
	componentStyles: {
		"buyable"() { return {"height": "25px", "width": "175px", "border-radius": "10px", "z-index": "99"} },
	},
	bars: getColorBars(),
	buyables: getColorBuyables(),
	clickables: {
		11: {
			display() {
				if (!getClickableState("c", 11)) return "<h2>Buying 1x";
				else return "<h2>Buying " + getClickableState("c", 11);
			},
			style: {"min-height": "40px", "border-radius": "20px"},
			canClick() { return true },
			onClick() {
				if (!getClickableState("c", 11) == "1x") {
					setClickableState("c", 11, "1x");
				};
				if (getClickableState("c", 11) == "1x") {
					setClickableState("c", 11, "5x");
				} else {
					setClickableState("c", 11, "1x");
				};
			},
			unlocked() { return hasUpgrade("c", 11) },
		},
	},
	upgrades: {
		11: {
			fullDisplay() { return "<h3>Quintuple Purchase</h3><br>unlocks the bulk buy 5x option<br><br>Cost: " + illionFormat(this.coinCost) + " coins" },
			canAfford() { return player.points.gte(this.coinCost) },
			coinCost: 1e6,
			pay() { player.points = player.points.sub(this.coinCost) },
			style() { if (this.canAfford() && !hasUpgrade("c", this.id)) return {
				"background": "var(--rainbowline)",
				"background-size": "200%",
				"animation": "3s linear infinite rainbowline",
			}},
		},
	},
});

addNode("spacer", {
	row: 1,
	layerShown: "ghost",
});

addLayer("m", {
	name: "Multiplier",
	symbol: "M",
	position: 0,
	startData() { return {
		unlocked: false,
		points: new Decimal(0),
	}},
	color: "slategray",
	requires: 4,
	resource: "total multiplier",
	baseResource: "colors",
	baseAmount() { return new Decimal(player.c.colors) },
	type: "custom",
	getResetGain(x = 0) {
		let num = player.c.colors + x;
		let earnings = [0, 0, 0, 0, 2, 5, 25, 100];
		if (num >= earnings.length) return new Decimal(earnings[earnings.length - 1]);
		else return new Decimal(earnings[num]);
	},
	getNextAt() {
		if (!tmp.m.canReset) return tmp.m.requires;
		else return player.c.colors + 1;
	},
	canReset() { return player.c.colors >= tmp.m.requires },
	prestigeNotify() { return tmp.m.canReset && (new Decimal(tmp.m.resetGain).gte(player.m.points.div(10))) },
	prestigeButtonText() {
		let text = "";
		if (player.m.points.lt(1e3)) text += "Reset for ";
		if (!tmp.m.canReset) return text + "+<b>0</b> multiplier<br><br>You will gain 2 more at 4 colors";
		else return text + "+<b>" + illionFormat(tmp.m.resetGain, false, 0) + "</b> multiplier<br><br>You will gain " + illionFormat(this.getResetGain(1) - this.getResetGain(), true, 0) + " more at " + illionFormat(tmp.m.nextAt, true, 0) + " colors";
	},
	onPrestige(gain) {
		let color = getRandomInt(1, player.c.colorBest);
		let type = getRandomInt(1, 3);
		let id = type * 100 + color + 1;
		setGridData("m", id, gain.add(getGridData("m", id)));
	},
	row: 2,
	hotkeys: [{
		key: "M",
		description: "Shift+M: Reset for multiplier",
		onPress() { if (player.m.unlocked) doReset("m") },
	}],
	layerShown() { return true },
	marked: "moon",
	tabFormat: [
		"main-display",
		"prestige-button",
		["custom-resource-display", function() {
			return "You have " + player.c.colors + " colors<br>Your best colors is " + player.c.colorBest;
		}],
		"blank",
		"grid",
	],
	grid: {
		rows: 3,
		cols() { return player.c.colorBest + 1 },
		maxCols: COLORS.length + 1,
		getStartData(id) {},
		getUnlocked(id) { return true },
		getStyle(data, id) {
			const INDEX = id % 100 - 2;
			return {"width": "60px", "height": "60px", "color": (INDEX >= 0 ? COLORS[INDEX].hex : "#000000")};
		},
		getCanClick(data, id) { return id % 100 == 1 || data > 0 },
		onClick(data, id) { return },
		getDisplay(data, id) {
			if (id == 101) return "<h3>power";
			if (id == 201) return "<h3>speed";
			if (id == 301) return "<h3>cost";
			if (data == 0) return "<h3>N/A";
			return "<h3>" + illionFormat(data, true, 0);
		},
		getTooltip(data, id) {
			if (id == 101) return "this row multiplies power";
			if (id == 201) return "this row multiplies speed";
			if (id == 301) return "this row divides cost";
			let tooltip = "this ";
			if (id < 200) tooltip += "multiplies power";
			else if (id < 300) tooltip += "multiplies speed";
			else if (id < 400) tooltip += "divides cost";
			const INDEX = id % 100 - 2;
			return tooltip + " of " + (COLORS[INDEX] ? COLORS[INDEX].name : "N/A");
		},
	},
});
