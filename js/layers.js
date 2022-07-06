addLayer('c', {
    name: 'Colors',
    symbol: `<span class="rainbowline-backround noborder">
        <h5><br></h5>
        <h3 class="rainbowfade-text">C`,
    noedge: true,
    position: 0,
    startData() { return {
        unlocked: true,
        colors: 1,
        timeRed: new Decimal(0),
        earnRed: new Decimal(4),
        timeOrange: new Decimal(0),
        earnOrange: new Decimal(0),
        timeYellow: new Decimal(0),
        earnYellow: new Decimal(0),
        timeSlime: new Decimal(0),
        earnSlime: new Decimal(0),
        timeLime: new Decimal(0),
        earnLime: new Decimal(0),
        timeTeal: new Decimal(0),
        earnTeal: new Decimal(0),
    }},
    color: 'white',
    tooltip() {
        return formatWhole(player.c.colors) + ' colors';
    },
    row: 0,
    layerShown() {
        return true;
    },
    doReset(resettingLayer) {
        let keep = [];
            if (layers[resettingLayer].row > this.row) layerDataReset('c', keep);
        },
    update(diff) {
        // update unlocks
        if (getBuyableAmount('c', 61).gt(0)) player.c.colors = 6;
        else if (getBuyableAmount('c', 51).gt(0)) player.c.colors = 5;
        else if (getBuyableAmount('c', 41).gt(0)) player.c.colors = 4;
        else if (getBuyableAmount('c', 31).gt(0)) player.c.colors = 3;
        else if (getBuyableAmount('c', 21).gt(0)) player.c.colors = 2;
        else player.c.colors = 1;
        // calculate
        earnings = getBuyableAmount('c', 11).add(1).mul(4);
        if (getBuyableAmount('c', 11).gte(9)) earnings = earnings.mul(3);
        if (getBuyableAmount('c', 11).gte(24)) earnings = earnings.mul(6);
        if (getBuyableAmount('c', 11).gte(49)) earnings = earnings.mul(9);
        if (getBuyableAmount('c', 11).gte(99)) earnings = earnings.mul(25);
        if (getGridData('r', 102) != 0) earnings = earnings.mul(getGridData('r', 102));
        player.c.earnRed = earnings;
        earnings = getBuyableAmount('c', 21).mul(412.5);
        if (getBuyableAmount('c', 21).gte(10)) earnings = earnings.mul(3);
        if (getBuyableAmount('c', 21).gte(25)) earnings = earnings.mul(6);
        if (getBuyableAmount('c', 21).gte(50)) earnings = earnings.mul(9);
        if (getBuyableAmount('c', 21).gte(100)) earnings = earnings.mul(25);
        if (getGridData('r', 103) != 0) earnings = earnings.mul(getGridData('r', 103));
        player.c.earnOrange = earnings;
        earnings = getBuyableAmount('c', 31).mul(17500);
        if (getBuyableAmount('c', 31).gte(10)) earnings = earnings.mul(3);
        if (getBuyableAmount('c', 31).gte(25)) earnings = earnings.mul(6);
        if (getBuyableAmount('c', 31).gte(50)) earnings = earnings.mul(9);
        if (getBuyableAmount('c', 31).gte(100)) earnings = earnings.mul(25);
        if (getGridData('r', 104) != 0) earnings = earnings.mul(getGridData('r', 104));
        player.c.earnYellow = earnings;
        earnings = getBuyableAmount('c', 41).mul(1250000);
        if (getBuyableAmount('c', 41).gte(10)) earnings = earnings.mul(3);
        if (getBuyableAmount('c', 41).gte(25)) earnings = earnings.mul(6);
        if (getBuyableAmount('c', 41).gte(50)) earnings = earnings.mul(9);
        if (getBuyableAmount('c', 41).gte(100)) earnings = earnings.mul(25);
        if (getGridData('r', 105) != 0) earnings = earnings.mul(getGridData('r', 105));
        player.c.earnSlime = earnings;
        earnings = getBuyableAmount('c', 51).mul(500000000);
        if (getBuyableAmount('c', 51).gte(10)) earnings = earnings.mul(3);
        if (getBuyableAmount('c', 51).gte(25)) earnings = earnings.mul(6);
        if (getBuyableAmount('c', 51).gte(50)) earnings = earnings.mul(9);
        if (getBuyableAmount('c', 51).gte(100)) earnings = earnings.mul(25);
        if (getGridData('r', 106) != 0) earnings = earnings.mul(getGridData('r', 106));
        player.c.earnLime = earnings;
        earnings = getBuyableAmount('c', 61).mul(75e9);
        if (getBuyableAmount('c', 61).gte(10)) earnings = earnings.mul(3);
        if (getBuyableAmount('c', 61).gte(25)) earnings = earnings.mul(6);
        if (getBuyableAmount('c', 61).gte(50)) earnings = earnings.mul(9);
        if (getBuyableAmount('c', 61).gte(100)) earnings = earnings.mul(25);
        if (getGridData('r', 107) != 0) earnings = earnings.mul(getGridData('r', 107));
        player.c.earnTeal = earnings;
        // earn
        if (player.c.timeRed.gt(1)) {
            player.points = player.points.add(player.c.earnRed);
            player.c.timeRed = new Decimal(0);
        };
        if (player.c.timeOrange.gt(1)) {
            player.points = player.points.add(player.c.earnOrange);
            player.c.timeOrange = new Decimal(0);
        };
        if (player.c.timeYellow.gt(1)) {
            player.points = player.points.add(player.c.earnYellow);
            player.c.timeYellow = new Decimal(0);
        };
        if (player.c.timeSlime.gt(1)) {
            player.points = player.points.add(player.c.earnSlime);
            player.c.timeSlime = new Decimal(0);
        };
        if (player.c.timeLime.gt(1)) {
            player.points = player.points.add(player.c.earnLime);
            player.c.timeLime = new Decimal(0);
        };
        if (player.c.timeTeal.gt(1)) {
            player.points = player.points.add(player.c.earnTeal);
            player.c.timeTeal = new Decimal(0);
        };
        speed = new Decimal(diff);
        if (getGridData('r', 202) != 0) speed = speed.mul(getGridData('r', 202));
        player.c.timeRed = player.c.timeRed.add(speed.div(3));
        speed = new Decimal(diff);
        if (getGridData('r', 203) != 0) speed = speed.mul(getGridData('r', 203));
        if (getBuyableAmount('c', 21).gt(0)) player.c.timeOrange = player.c.timeOrange.add(speed.div(6));
        else player.c.timeOrange = new Decimal(0);
        speed = new Decimal(diff);
        if (getGridData('r', 204) != 0) speed = speed.mul(getGridData('r', 204));
        if (getBuyableAmount('c', 31).gt(0)) player.c.timeYellow = player.c.timeYellow.add(speed.div(12));
        else player.c.timeYellow = new Decimal(0);
        speed = new Decimal(diff);
        if (getGridData('r', 205) != 0) speed = speed.mul(getGridData('r', 205));
        if (getBuyableAmount('c', 41).gt(0)) player.c.timeSlime = player.c.timeSlime.add(speed.div(24));
        else player.c.timeSlime = new Decimal(0);
        speed = new Decimal(diff);
        if (getGridData('r', 206) != 0) speed = speed.mul(getGridData('r', 206));
        if (getBuyableAmount('c', 51).gt(0)) player.c.timeLime = player.c.timeLime.add(speed.div(48));
        else player.c.timeLime = new Decimal(0);
        speed = new Decimal(diff);
        if (getGridData('r', 207) != 0) speed = speed.mul(getGridData('r', 207));
        if (getBuyableAmount('c', 61).gt(0)) player.c.timeTeal = player.c.timeTeal.add(speed.div(72));
        else player.c.timeTeal = new Decimal(0);
    },
    tabFormat: {
        "Colors": {
            content: [
                ['display-text', function() {
                    return 'You have <h2 class="rainbowvalue-text">' + formatWhole(player.c.colors) + '</h2> colors unlocked';
                }],
                'blank',
                ['row', [
                    ['display-text', '<b class="sidetext" style="color:red">RED'],
                    ['bar', 'redProg'],
                    'blank',
                    ['bar', 'redBar'],
                    ['blank', ['6.5px', '1px']],
                    ['column', [
                        ['bar', 'redBuy'],
                        ['blank', '2px'],
                        ['buyables', '1'],
                    ]],
                ]],
                'blank',
                ['row', [
                    ['display-text', '<b class="sidetext" style="color:#ff8800">ORANGE'],
                    ['bar', 'orangeProg'],
                    'blank',
                    ['bar', 'orangeBar'],
                    ['blank', ['6.5px', '1px']],
                    ['column', [
                        ['bar', 'orangeBuy'],
                        ['blank', '2px'],
                        ['buyables', '2'],
                    ]],
                ]],
                'blank',
                ['row', [
                    ['display-text', function() {
                        if (player.c.colors >= 2) return '<b class="sidetext" style="color:yellow">YELLOW';
                    }],
                    ['bar', 'yellowProg'],
                    'blank',
                    ['bar', 'yellowBar'],
                    ['blank', ['6.5px', '1px']],
                    ['column', [
                        ['bar', 'yellowBuy'],
                        ['blank', '2px'],
                        ['buyables', '3'],
                    ]],
                ]],
                'blank',
                ['row', [
                    ['display-text', function() {
                        if (player.c.colors >= 3) return '<b class="sidetext" style="color:#99dd00">SLIME';
                    }],
                    ['bar', 'slimeProg'],
                    'blank',
                    ['bar', 'slimeBar'],
                    ['blank', ['6.5px', '1px']],
                    ['column', [
                        ['bar', 'slimeBuy'],
                        ['blank', '2px'],
                        ['buyables', '4'],
                    ]],
                ]],
                'blank',
                ['row', [
                    ['display-text', function() {
                        if (player.c.colors >= 4) return '<b class="sidetext" style="color:lime">LIME';
                    }],
                    ['bar', 'limeProg'],
                    'blank',
                    ['bar', 'limeBar'],
                    ['blank', ['6.5px', '1px']],
                    ['column', [
                        ['bar', 'limeBuy'],
                        ['blank', '2px'],
                        ['buyables', '5'],
                    ]],
                ]],
                'blank',
                ['row', [
                    ['display-text', function() {
                        if (player.c.colors >= 5) return '<b class="sidetext" style="color:#00ff88">TEAL';
                    }],
                    ['bar', 'tealProg'],
                    'blank',
                    ['bar', 'tealBar'],
                    ['blank', ['6.5px', '1px']],
                    ['column', [
                        ['bar', 'tealBuy'],
                        ['blank', '2px'],
                        ['buyables', '6'],
                    ]],
                ]],
            ],
        },
        "Upgrades": {
            content: [
                ['display-text', function() {
                    return 'You have <h2 class="rainbowvalue-text">' + formatWhole(player.c.colors) + '</h2> colors unlocked';
                }],
            ],
        },
    },
    bars: {
        redBar: {
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return player.c.timeRed;
            },
            display() {
                return 'earnings per cycle: ' + illionFormat(player.c.earnRed) + ' coins';
            },
            fillStyle: {'background-color':'red'},
            borderStyle: {'border-color':'red'},
            style: {'color':'white'},
        },
        redBuy: {
            direction: LEFT,
            width: 180,
            height: 20,
            progress() {
                return player.points.div(layers.c.buyables[11].cost());
            },
            display() {
                if (this.progress().gt(1)) return illionFormat(100) + '%';
                return illionFormat(this.progress().mul(100)) + '%';
            },
            fillStyle: {'background-color':'red'},
            borderStyle: {'border-color':'red'},
            style: {'color':'white'},
        },
        redProg: {
            direction: UP,
            width: 60,
            height: 60,
            progress() {
                if (getBuyableAmount('c', 11).lt(9)) goal = 10;
                else if (getBuyableAmount('c', 11).lt(24)) goal = 25;
                else if (getBuyableAmount('c', 11).lt(49)) goal = 50;
                else if (getBuyableAmount('c', 11).lt(99)) goal = 100;
                else goal = 200;
                return getBuyableAmount('c', 11).add(1).div(goal);
            },
            display() {
                return '<h1 style="font-family:Flavors">' + formatWhole(getBuyableAmount('c', 11).add(1));
            },
            fillStyle: {'background-color':'red'},
            borderStyle: {'border-color':'red'},
            style: {'color':'white','border-radius':'50%'},
        },
        orangeBar: {
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return player.c.timeOrange;
            },
            display() {
                if (getBuyableAmount('c', 21).eq(0)) return 'locked';
                return 'earnings per cycle: ' + illionFormat(player.c.earnOrange) + ' coins';
            },
            fillStyle: {'background-color':'#ff8800'},
            borderStyle: {'border-color':'#ff8800'},
            style: {'color':'white'},
        },
        orangeBuy: {
            direction: LEFT,
            width: 180,
            height: 20,
            progress() {
                return player.points.div(layers.c.buyables[21].cost());
            },
            display() {
                if (this.progress().gt(1)) return illionFormat(100) + '%';
                return illionFormat(this.progress().mul(100)) + '%';
            },
            fillStyle: {'background-color':'#ff8800'},
            borderStyle: {'border-color':'#ff8800'},
            style: {'color':'white'},
        },
        orangeProg: {
            direction: UP,
            width: 60,
            height: 60,
            progress() {
                if (getBuyableAmount('c', 21).lt(10)) goal = 10;
                else if (getBuyableAmount('c', 21).lt(25)) goal = 25;
                else if (getBuyableAmount('c', 21).lt(50)) goal = 50;
                else if (getBuyableAmount('c', 21).lt(100)) goal = 100;
                else goal = 200;
                return getBuyableAmount('c', 21).div(goal);
            },
            display() {
                return '<h1 style="font-family:Flavors">' + formatWhole(getBuyableAmount('c', 21));
            },
            fillStyle: {'background-color':'#ff8800'},
            borderStyle: {'border-color':'#ff8800'},
            style: {'color':'white','border-radius':'50%'},
        },
        yellowBar: {
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return player.c.timeYellow;
            },
            display() {
                if (getBuyableAmount('c', 31).eq(0)) return 'locked';
                return 'earnings per cycle: ' + illionFormat(player.c.earnYellow) + ' coins';
            },
            fillStyle: {'background-color':'yellow'},
            borderStyle: {'border-color':'yellow'},
            style: {'color':'#aaaaaa'},
            unlocked() {
                if (player.c.colors >= 2) return true;
            },
        },
        yellowBuy: {
            direction: LEFT,
            width: 180,
            height: 20,
            progress() {
                return player.points.div(layers.c.buyables[31].cost());
            },
            display() {
                if (this.progress().gt(1)) return illionFormat(100) + '%';
                return illionFormat(this.progress().mul(100)) + '%';
            },
            fillStyle: {'background-color':'yellow'},
            borderStyle: {'border-color':'yellow'},
            style: {'color':'#aaaaaa'},
            unlocked() {
                if (player.c.colors >= 2) return true;
            },
        },
        yellowProg: {
            direction: UP,
            width: 60,
            height: 60,
            progress() {
                if (getBuyableAmount('c', 31).lt(10)) goal = 10;
                else if (getBuyableAmount('c', 31).lt(25)) goal = 25;
                else if (getBuyableAmount('c', 31).lt(50)) goal = 50;
                else if (getBuyableAmount('c', 31).lt(100)) goal = 100;
                else goal = 200;
                return getBuyableAmount('c', 31).div(goal);
            },
            display() {
                return '<h1 style="font-family:Flavors">' + formatWhole(getBuyableAmount('c', 31));
            },
            fillStyle: {'background-color':'yellow'},
            borderStyle: {'border-color':'yellow'},
            style: {'color':'#aaaaaa','border-radius':'50%'},
            unlocked() {
                if (player.c.colors >= 2) return true;
            },
        },
        slimeBar: {
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return player.c.timeSlime;
            },
            display() {
                if (getBuyableAmount('c', 41).eq(0)) return 'locked';
                return 'earnings per cycle: ' + illionFormat(player.c.earnSlime) + ' coins';
            },
            fillStyle: {'background-color':'#99dd00'},
            borderStyle: {'border-color':'#99dd00'},
            style: {'color':'white'},
            unlocked() {
                if (player.c.colors >= 3) return true;
            },
        },
        slimeBuy: {
            direction: LEFT,
            width: 180,
            height: 20,
            progress() {
                return player.points.div(layers.c.buyables[41].cost());
            },
            display() {
                if (this.progress().gt(1)) return illionFormat(100) + '%';
                return illionFormat(this.progress().mul(100)) + '%';
            },
            fillStyle: {'background-color':'#99dd00'},
            borderStyle: {'border-color':'#99dd00'},
            style: {'color':'white'},
            unlocked() {
                if (player.c.colors >= 3) return true;
            },
        },
        slimeProg: {
            direction: UP,
            width: 60,
            height: 60,
            progress() {
                if (getBuyableAmount('c', 41).lt(10)) goal = 10;
                else if (getBuyableAmount('c', 41).lt(25)) goal = 25;
                else if (getBuyableAmount('c', 41).lt(50)) goal = 50;
                else if (getBuyableAmount('c', 41).lt(100)) goal = 100;
                else goal = 200;
                return getBuyableAmount('c', 41).div(goal);
            },
            display() {
                return '<h1 style="font-family:Flavors">' + formatWhole(getBuyableAmount('c', 41));
            },
            fillStyle: {'background-color':'#99dd00'},
            borderStyle: {'border-color':'#99dd00'},
            style: {'color':'white','border-radius':'50%'},
            unlocked() {
                if (player.c.colors >= 3) return true;
            },
        },
        limeBar: {
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return player.c.timeLime;
            },
            display() {
                if (getBuyableAmount('c', 51).eq(0)) return 'locked';
                return 'earnings per cycle: ' + illionFormat(player.c.earnLime) + ' coins';
            },
            fillStyle: {'background-color':'lime'},
            borderStyle: {'border-color':'lime'},
            style: {'color':'#aaaaaa'},
            unlocked() {
                if (player.c.colors >= 4) return true;
            },
        },
        limeBuy: {
            direction: LEFT,
            width: 180,
            height: 20,
            progress() {
                return player.points.div(layers.c.buyables[51].cost());
            },
            display() {
                if (this.progress().gt(1)) return illionFormat(100) + '%';
                return illionFormat(this.progress().mul(100)) + '%';
            },
            fillStyle: {'background-color':'lime'},
            borderStyle: {'border-color':'lime'},
            style: {'color':'#aaaaaa'},
            unlocked() {
                if (player.c.colors >= 4) return true;
            },
        },
        limeProg: {
            direction: UP,
            width: 60,
            height: 60,
            progress() {
                if (getBuyableAmount('c', 51).lt(10)) goal = 10;
                else if (getBuyableAmount('c', 51).lt(25)) goal = 25;
                else if (getBuyableAmount('c', 51).lt(50)) goal = 50;
                else if (getBuyableAmount('c', 51).lt(100)) goal = 100;
                else goal = 200;
                return getBuyableAmount('c', 51).div(goal);
            },
            display() {
                return '<h1 style="font-family:Flavors">' + formatWhole(getBuyableAmount('c', 51));
            },
            fillStyle: {'background-color':'lime'},
            borderStyle: {'border-color':'lime'},
            style: {'color':'#aaaaaa','border-radius':'50%'},
            unlocked() {
                if (player.c.colors >= 4) return true;
            },
        },
        tealBar: {
            direction: RIGHT,
            width: 300,
            height: 50,
            progress() {
                return player.c.timeTeal;
            },
            display() {
                if (getBuyableAmount('c', 61).eq(0)) return 'locked';
                return 'earnings per cycle: ' + illionFormat(player.c.earnTeal) + ' coins';
            },
            fillStyle: {'background-color':'#00ff88'},
            borderStyle: {'border-color':'#00ff88'},
            style: {'color':'#aaaaaa'},
            unlocked() {
                if (player.c.colors >= 5) return true;
            },
        },
        tealBuy: {
            direction: LEFT,
            width: 180,
            height: 20,
            progress() {
                return player.points.div(layers.c.buyables[61].cost());
            },
            display() {
                if (this.progress().gt(1)) return illionFormat(100) + '%';
                return illionFormat(this.progress().mul(100)) + '%';
            },
            fillStyle: {'background-color':'#00ff88'},
            borderStyle: {'border-color':'#00ff88'},
            style: {'color':'#aaaaaa'},
            unlocked() {
                if (player.c.colors >= 5) return true;
            },
        },
        tealProg: {
            direction: UP,
            width: 60,
            height: 60,
            progress() {
                if (getBuyableAmount('c', 61).lt(10)) goal = 10;
                else if (getBuyableAmount('c', 61).lt(25)) goal = 25;
                else if (getBuyableAmount('c', 61).lt(50)) goal = 50;
                else if (getBuyableAmount('c', 61).lt(100)) goal = 100;
                else goal = 200;
                return getBuyableAmount('c', 61).div(goal);
            },
            display() {
                return '<h1 style="font-family:Flavors">' + formatWhole(getBuyableAmount('c', 61));
            },
            fillStyle: {'background-color':'#00ff88'},
            borderStyle: {'border-color':'#00ff88'},
            style: {'color':'#aaaaaa','border-radius':'50%'},
            unlocked() {
                if (player.c.colors >= 5) return true;
            },
        },
    },
    buyables: {
        11: {
            cost() {
                x = getBuyableAmount('c', 11).add(1);
                divnum = new Decimal(1);
                if (getGridData('r', 302) != 0) divnum = divnum.mul(getGridData('r', 302));
                return new Decimal(1).add(x.mul(0.8)).add(new Decimal(1.2).pow(x)).div(divnum);
            },
            canAfford() {
                return player.points.gte(this.cost()) && getBuyableAmount('c', this.id).lt(this.purchaseLimit);
            },
            purchaseLimit: 1000,
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount('c', this.id, getBuyableAmount('c', this.id).add(1));
            },
            display() {
                return '<h3 style="color:red">Cost: ' + illionFormat(this.cost(), true) + ' coins';
            },
            style: {'background-color':'white','border-radius':'0%','height':'25px','width':'180px'},
        },
        21: {
            cost() {
                x = getBuyableAmount('c', 21).add(32);
                divnum = new Decimal(1);
                if (getGridData('r', 303) != 0) divnum = divnum.mul(getGridData('r', 303));
                return new Decimal(1).add(x.mul(0.8)).add(new Decimal(1.2).pow(x)).div(divnum);
            },
            canAfford() {
                return player.points.gte(this.cost()) && getBuyableAmount('c', this.id).lt(this.purchaseLimit);
            },
            purchaseLimit: 1000,
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount('c', this.id, getBuyableAmount('c', this.id).add(1));
            },
            display() {
                if (getBuyableAmount('c', 21).eq(0)) return '<h3 style="color:#ff8800">Unlock: ' + illionFormat(this.cost(), true) + ' coins';
                return '<h3 style="color:#ff8800">Cost: ' + illionFormat(this.cost(), true) + ' coins';
            },
            style: {'background-color':'white','border-radius':'0%','height':'25px','width':'180px'},
        },
        31: {
            cost() {
                x = getBuyableAmount('c', 31).add(64);
                divnum = new Decimal(1);
                if (getGridData('r', 304) != 0) divnum = divnum.mul(getGridData('r', 304));
                return new Decimal(1).add(x.mul(0.8)).add(new Decimal(1.2).pow(x)).div(divnum);
            },
            canAfford() {
                return player.points.gte(this.cost()) && getBuyableAmount('c', this.id).lt(this.purchaseLimit);
            },
            purchaseLimit: 1000,
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount('c', this.id, getBuyableAmount('c', this.id).add(1));
            },
            display() {
                if (getBuyableAmount('c', 31).eq(0)) return '<h3 style="color:yellow">Unlock: ' + illionFormat(this.cost(), true) + ' coins';
                return '<h3 style="color:yellow">Cost: ' + illionFormat(this.cost(), true) + ' coins';
            },
            style: {'background-color':'#aaaaaa','border-radius':'0%','height':'25px','width':'180px'},
            unlocked() {
                if (player.c.colors >= 2) return true;
            },
        },
        41: {
            cost() {
                x = getBuyableAmount('c', 41).add(96);
                divnum = new Decimal(1);
                if (getGridData('r', 305) != 0) divnum = divnum.mul(getGridData('r', 305));
                return new Decimal(1).add(x.mul(0.8)).add(new Decimal(1.2).pow(x)).div(divnum);
            },
            canAfford() {
                return player.points.gte(this.cost()) && getBuyableAmount('c', this.id).lt(this.purchaseLimit);
            },
            purchaseLimit: 1000,
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount('c', this.id, getBuyableAmount('c', this.id).add(1));
            },
            display() {
                if (getBuyableAmount('c', 41).eq(0)) return '<h3 style="color:#88cc00">Unlock: ' + illionFormat(this.cost(), true) + ' coins';
                return '<h3 style="color:#88cc00">Cost: ' + illionFormat(this.cost(), true) + ' coins';
            },
            style: {'background-color':'white','border-radius':'0%','height':'25px','width':'180px'},
            unlocked() {
                if (player.c.colors >= 3) return true;
            },
        },
        51: {
            cost() {
                x = getBuyableAmount('c', 51).add(128);
                divnum = new Decimal(1);
                if (getGridData('r', 306) != 0) divnum = divnum.mul(getGridData('r', 306));
                return new Decimal(1).add(x.mul(0.8)).add(new Decimal(1.2).pow(x)).div(divnum);
            },
            canAfford() {
                return player.points.gte(this.cost()) && getBuyableAmount('c', this.id).lt(this.purchaseLimit);
            },
            purchaseLimit: 1000,
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount('c', this.id, getBuyableAmount('c', this.id).add(1));
            },
            display() {
                if (getBuyableAmount('c', this.id).eq(0)) return '<h3 style="color:lime">Unlock: ' + illionFormat(this.cost(), true) + ' coins';
                return '<h3 style="color:lime">Cost: ' + illionFormat(this.cost(), true) + ' coins';
            },
            style: {'background-color':'#aaaaaa','border-radius':'0%','height':'25px','width':'180px'},
            unlocked() {
                if (player.c.colors >= 4) return true;
            },
        },
        61: {
            cost() {
                x = getBuyableAmount('c', this.id).add(160);
                divnum = new Decimal(1);
                if (getGridData('r', 307) != 0) divnum = divnum.mul(getGridData('r', 307));
                return new Decimal(1).add(x.mul(0.8)).add(new Decimal(1.2).pow(x)).div(divnum);
            },
            canAfford() {
                return player.points.gte(this.cost()) && getBuyableAmount('c', this.id).lt(this.purchaseLimit);
            },
            purchaseLimit: 1000,
            buy() {
                player.points = player.points.sub(this.cost());
                setBuyableAmount('c', this.id, getBuyableAmount('c', this.id).add(1));
            },
            display() {
                if (getBuyableAmount('c', this.id).eq(0)) return '<h3 style="color:#00ff88">Unlock: ' + illionFormat(this.cost(), true) + ' coins';
                return '<h3 style="color:#00ff88">Cost: ' + illionFormat(this.cost(), true) + ' coins';
            },
            style: {'background-color':'#aaaaaa','border-radius':'0%','height':'25px','width':'180px'},
            unlocked() {
                if (player.c.colors >= 5) return true;
            },
        },
    },
});

addLayer('r', {
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        bestcolors: 1,
    }},
    color: 'slategray',
    resource: 'total multiplier',
    row: 2,
    baseResource: 'colors',
    baseAmount() {
        return new Decimal(player.c.colors);
    },
    requires: new Decimal(4),
    type: 'custom',
    getResetGain(x = 0) {
        earnings = [0, 0, 0, 0, 2, 5, 36];
        return new Decimal(earnings[player.c.colors + x]);
    },
    getNextAt() {
        if (!tmp.r.canReset) return tmp.r.requires;
        return player.c.colors + 1;
    },
    canReset() {
        return player.c.colors >= 4;
    },
    prestigeNotify() {
        return tmp.r.canReset && (new Decimal(tmp.r.resetGain).gte(player.r.points.div(10)));
    },
    prestigeButtonText() {
        text = '';
        if (player.r.points.lt(1e3)) text += 'Reset for ';
        if (!tmp.r.canReset) return text+'+<b>0</b> multiplier<br><br>You will gain 2 more at 4 colors';
        return text+'+<b>'+illionFormat(tmp.r.resetGain,false,0)+'</b> multiplier<br><br>You will gain '+illionFormat(this.getResetGain(1)-this.getResetGain(),true,0)+' more at '+illionFormat(tmp.r.nextAt,true,0)+' colors';
    },
    onPrestige(gain) {
        if (gain === undefined || gain === null || gain === NaN || gain === Infinity) return;
        gain = new Decimal(gain);
        color = getRandomInt(1, player.r.bestcolors);
        type = getRandomInt(1, 3);
        id = type*100+color+1;
        setGridData('r', id, new Decimal(gain.add(getGridData('r', id))));
    },
    layerShown() {
        return true;
    },
    marked: true,
    update(diff) {
        if (player.c.colors > player.r.bestcolors) player.r.bestcolors = player.c.colors;
    },
    tabFormat: [
        'main-display',
        'prestige-button',
        'blank',
        ['display-text',
            function() {
                return 'You have ' + player.c.colors + ' colors<br>Your best colors is ' + player.r.bestcolors;
            }],
        'blank',
        'grid',
    ],
    grid: {
        rows: 3,
        cols() {
            return player.r.bestcolors + 1;
        },
        maxCols: 10,
        getStartData(id) {
            return 0;
        },
        getUnlocked(id) {
            return true;
        },
        getStyle(data, id) {
            color = 'black';
            if (id % 100 == 2) color = ('red');
            if (id % 100 == 3) color = ('#ff8800');
            if (id % 100 == 4) color = ('yellow');
            if (id % 100 == 5) color = ('#88cc00');
            if (id % 100 == 6) color = ('lime');
            if (id % 100 == 7) color = ('#00ff88');
            return {'width':'60px','height':'60px','color':color};
        },
        getCanClick(data, id) {
            return true;
        },
        onClick(data, id) { 
            return;
        },
        getDisplay(data, id) {
            if (id == 101) return '<h3>power';
            if (id == 201) return '<h3>speed';
            if (id == 301) return '<h3>cost';
            if (data == 0) return '<h3>*';
            return '<h3>' + illionFormat(data, true, 0);
        },
        getTooltip(data, id) {
            if (id == 101) return 'this row multiplies power';
            if (id == 201) return 'this row multiplies speed';
            if (id == 301) return 'this row divides cost';
            tip = 'this ';
            if (id < 200) tip += 'multiplies power';
            else if (id < 300) tip += 'multiplies speed';
            else if (id < 400) tip += 'divides cost';
            tip += ' of ';
            if (id % 100 == 2) tip += 'red';
            if (id % 100 == 3) tip += 'orange';
            if (id % 100 == 4) tip += 'yellow';
            if (id % 100 == 5) tip += 'slime';
            if (id % 100 == 6) tip += 'lime';
            if (id % 100 == 7)tip += 'teal';
            return tip;
        },
    },
});
