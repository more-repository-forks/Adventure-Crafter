function illionFormat(decimal, short, precision = 2) {
    // setup
    let suffix = "";
    let divnum = new Decimal(1);
    let centillions = 0;
    let addt = false;
    decimal = new Decimal(decimal);
    if (!short) suffix = " ";
    if (options.extendplaces && precision == 2) precision = 3;
    // illion calculation
    if (decimal.gte("e30003") || options.nfDisplay == "e") { // format normally if higher than 9,999th illion
        return format(decimal, precision);
    };
    if (decimal.gte("e3003")) { // add prefix if higher than 999th illion
        if (decimal.gte("e27003")) { // 9,000th
            divnum = divnum.mul("e27003");
            centillions += 90;
            if (!short) suffix += "novemmillia";
            else suffix += "nM";
        } else if (decimal.gte("e24003")) { // 8,000th
            divnum = divnum.mul("e24003");
            centillions += 80;
            if (!short) suffix += "octomillia";
            else suffix += "oM";
        } else if (decimal.gte("e21003")) { // 7,000th
            divnum = divnum.mul("e21003");
            centillions += 70;
            if (!short) suffix += "septenmillia";
            else suffix += "SM";
        } else if (decimal.gte("e18003")) { // 6,000th
            divnum = divnum.mul("e18003");
            centillions += 60;
            if (!short) suffix += "sexmillia";
            else suffix += "sM";
        } else if (decimal.gte("e15003")) { // 5,000th
            divnum = divnum.mul("e15003");
            centillions += 50;
            if (!short) suffix += "quinmillia";
            else suffix += "QM";
        } else if (decimal.gte("e12003")) { // 4,000th
            divnum = divnum.mul("e12003");
            centillions += 40;
            if (!short) suffix += "quattuormillia";
            else suffix += "qM";
        } else if (decimal.gte("e9003")) { // 3,000th
            divnum = divnum.mul("e9003");
            centillions += 30;
            if (!short) suffix += "tremillia";
            else suffix += "tM";
        } else if (decimal.gte("e6003")) { // 2,000th
            divnum = divnum.mul("e6003");
            centillions += 20;
            if (!short) suffix += "duomillia";
            else suffix += "dM";
        } else { // 1,000th
            divnum = divnum.mul("e3003");
            centillions += 10;
            if (!short) suffix += "millia";
            else suffix += "M";
        };
        if (!short) suffix += "-";
    };
    if (decimal.gte(1e303)) { // add prefix if higher than 99th illion
        if (decimal.div(new Decimal(1e300).pow(centillions)).gte("e2703")) { // 900th
            divnum = divnum.mul("e2700");
            centillions += 9;
            if (!short) suffix += "nongen";
            else suffix += "nC";
        } else if (decimal.div(new Decimal(1e300).pow(centillions)).gte("e2403")) { // 800th
            divnum = divnum.mul("e2400");
            centillions += 8;
            if (!short) suffix += "octingen";
            else suffix += "oC";
        } else if (decimal.div(new Decimal(1e300).pow(centillions)).gte("e2103")) { // 700th
            divnum = divnum.mul("e2100");
            centillions += 7;
            if (!short) suffix += "septingen";
            else suffix += "SC";
        } else if (decimal.div(new Decimal(1e300).pow(centillions)).gte("e1803")) { // 600th
            divnum = divnum.mul("e1800");
            centillions += 6;
            if (!short) suffix += "sescen";
            else suffix += "sC";
        } else if (decimal.div(new Decimal(1e300).pow(centillions)).gte("e1503")) { // 500th
            divnum = divnum.mul("e1500");
            centillions += 5;
            if (!short) suffix += "quingen";
            else suffix += "QC";
        } else if (decimal.div(new Decimal(1e300).pow(centillions)).gte("e1203")) { // 400th
            divnum = divnum.mul("e1200");
            centillions += 4;
            if (!short) suffix += "quadringen";
            else suffix += "qC";
        } else if (decimal.div(new Decimal(1e300).pow(centillions)).gte("e903")) { // 300th
            divnum = divnum.mul("e900");
            centillions += 3;
            if (!short) suffix += "trecen";
            else suffix += "tC";
        } else if (decimal.div(new Decimal(1e300).pow(centillions)).gte("e603")) { // 200th
            divnum = divnum.mul("e600");
            centillions += 2;
            if (!short) suffix += "duocen";
            else suffix += "dC";
        } else if (decimal.div(new Decimal(1e300).pow(centillions)).gte(1e303)) { // 100th
            divnum = divnum.mul(1e300);
            centillions += 1;
            if (!short) suffix += "cen";
            else suffix += "C";
        } else { // none
            if (short) suffix += "~";
        };
        if (!short) suffix += "-";
        if (decimal.lt("e3003")) divnum = divnum.mul(1e3);
    };
    if (decimal.gte(1e33)) { // add prefix if higher than 9th illion
        let exponent = decimal.layeradd10(-1).floor();
        // add first part
        if (exponent % 30 < 3) { // 9th
            divnum = divnum.mul(1e27);
            if (!short) suffix += "novem";
            else suffix += "n";
        } else if (exponent.sub(27) % 30 < 3) { // 8th
            divnum = divnum.mul(1e24);
            if (!short) suffix += "octo";
            else suffix += "o";
        } else if (exponent.sub(24) % 30 < 3) { // 7th
            divnum = divnum.mul(1e21);
            if (!short) suffix += "septen";
            else suffix += "S";
        } else if (exponent.sub(21) % 30 < 3) { // 6th
            divnum = divnum.mul(1e18);
            if (!short) suffix += "sex";
            else suffix += "s";
        } else if (exponent.sub(18) % 30 < 3) { // 5th
            divnum = divnum.mul(1e15);
            if (!short) suffix += "quin";
            else suffix += "Q";
        } else if (exponent.sub(15) % 30 < 3) { // 4th
            divnum = divnum.mul(1e12);
            if (!short) suffix += "quattuor";
            else suffix += "q";
        } else if (exponent.sub(12) % 30 < 3) { // 3rd
            divnum = divnum.mul(1e9);
            if (!short) suffix += "tre";
            else suffix += "t";
        } else if (exponent.sub(9) % 30 < 3) { // 2nd
            divnum = divnum.mul(1e6);
            if (!short) suffix += "duo";
            else suffix += "d";
        } else if (exponent.sub(6) % 30 < 3) { // 1st
            divnum = divnum.mul(1e3);
            if (!short) suffix += "un";
            else suffix += "u";
        } else { // none
            if (short) suffix += "~";
        };
        // add second part
        decimal = decimal.layeradd10(1);
        if ((exponent - 3) % 300 >= 30) {
            if (decimal.div(new Decimal(1e300).pow(centillions)).gte(1e273)) { // 90th
                divnum = divnum.mul(1e270);
                if (!short) suffix += "nona";
                else suffix += "n";
            } else if (decimal.div(new Decimal(1e300).pow(centillions)).gte(1e243)) { // 80th
                divnum = divnum.mul(1e240);
                if (!short) suffix += "octo";
                else suffix += "o";
            } else if (decimal.div(new Decimal(1e300).pow(centillions)).gte(1e213)) { // 70th
                divnum = divnum.mul(1e210);
                if (!short) suffix += "septua";
                else suffix += "S";
            } else if (decimal.div(new Decimal(1e300).pow(centillions)).gte(1e183)) { // 60th
                divnum = divnum.mul(1e180);
                if (!short) suffix += "sexa";
                else suffix += "s";
            } else if (decimal.div(new Decimal(1e300).pow(centillions)).gte(1e153)) { // 50th
                divnum = divnum.mul(1e150);
                if (!short) suffix += "quinqua";
                else suffix += "Q";
            } else if (decimal.div(new Decimal(1e300).pow(centillions)).gte(1e123)) { // 40th
                divnum = divnum.mul(1e120);
                if (!short) suffix += "quadra";
                else suffix += "q";
            } else if (decimal.div(new Decimal(1e300).pow(centillions)).gte(1e93)) { // 30th
                divnum = divnum.mul(1e90);
                if (!short) suffix += "tri";
                else suffix += "t";
            } else if (decimal.div(new Decimal(1e300).pow(centillions)).gte(1e63)) { // 20th
                divnum = divnum.mul(1e60);
                if (!short) suffix += "vi";
                else suffix += "v";
            } else { // 10th
                divnum = divnum.mul(1e30);
                if (!short) suffix += "dec";
                else suffix += "d";
            };
            if ((decimal.gte(1e303) && decimal.div(new Decimal(1e300).pow(centillions)).gte(1e60))
            || (decimal.lt(1e303) && decimal.gte(1e63))) { // add prefix part 2 ending
                if (!short) suffix += "gint";
            };
        } else {
            addt = true;
            if (short) suffix += "~";
        };
        if (decimal.lt(1e303)) divnum = divnum.mul(1e3);
    } else { // add prefix if 9th illion or lower
        if (decimal.gte(1e30)) { // 9th
            divnum = divnum.mul(1e30);
            if (!short) suffix += "non";
            else suffix += "n";
        } else if (decimal.gte(1e27)) { // 8th
            divnum = divnum.mul(1e27);
            if (!short) suffix += "oct";
            else suffix += "o";
        } else if (decimal.gte(1e24)) { // 7th
            divnum = divnum.mul(1e24);
            if (!short) suffix += "sept";
            else suffix += "S";
        } else if (decimal.gte(1e21)) { // 6th
            divnum = divnum.mul(1e21);
            if (!short) suffix += "sext";
            else suffix += "s";
        } else if (decimal.gte(1e18)) { // 5th
            divnum = divnum.mul(1e18);
            if (!short) suffix += "quint";
            else suffix += "Q";
        } else if (decimal.gte(1e15)) { // 4th
            divnum = divnum.mul(1e15);
            if (!short) suffix += "quadr";
            else suffix += "q";
        } else if (decimal.gte(1e12)) { // 3rd
            divnum = divnum.mul(1e12);
            if (!short) suffix += "tr";
            else suffix += "t";
        } else if (decimal.gte(1e9)) { // 2nd
            divnum = divnum.mul(1e9);
            if (!short) suffix += "b";
            else suffix += "b";
        } else if (decimal.gte(1e6)) { // 1st
            divnum = divnum.mul(1e6);
            if (!short) suffix += "m";
            else suffix += "m";
        } else if (decimal.gte(1e3)) { // 0th
            divnum = divnum.mul(1e3);
            if (!short) suffix += "thousand";
            else suffix += "k";
        } else { // none
            return format(decimal, precision);
        };
    };
    // add suffix
    if (decimal.gte(1e6)) {
        if (!short) {
            if (addt) suffix += "t";
            suffix += "illion";
        };
    };
    // return formatted decimal
    return decimal.div(divnum).toStringWithDecimalPlaces(precision) + suffix;
};

function exponentialFormat(num, precision, mantissa = true) {
	let e = num.log10().floor();
	let m = num.div(Decimal.pow(10, e));
	if (m.toStringWithDecimalPlaces(precision) == 10) {
		m = decimalOne;
		e = e.add(1);
	};
	e = e.gte(1e9) ? format(e, 3) : (e.gte(10000) ? commaFormat(e, 0) : e.toStringWithDecimalPlaces(0));
	if (mantissa) return m.toStringWithDecimalPlaces(precision) + "e" + e;
	return "e" + e;
};

function commaFormat(num, precision) {
	if (num === null || num === undefined) return "NaN";
	if (num.mag < 0.001) return (0).toFixed(precision);
	let init = num.toStringWithDecimalPlaces(precision);
	let portions = init.split(".");
	portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	if (portions.length == 1) return portions[0];
	return portions[0] + "." + portions[1];
};

function regularFormat(num, precision) {
	if (num === null || num === undefined) return "NaN";
	if (num.mag < 0.0001) return (0).toFixed(precision);
	if (num.mag < 0.1 && precision !==0) precision = Math.max(precision, 4);
	return num.toStringWithDecimalPlaces(precision);
};

function fixValue(x, y = 0) {
	return x || new Decimal(y);
};

function sumValues(x) {
	x = Object.values(x);
	if (!x[0]) return decimalZero;
	return x.reduce((a, b) => Decimal.add(a, b));
};

function format(decimal, precision = 2, small) {
	small = small || modInfo.allowSmall;
	if (options.extendplaces && precision == 2) precision = 3;
	decimal = new Decimal(decimal)
	if (isNaN(decimal.sign) || isNaN(decimal.layer) || isNaN(decimal.mag)) {
		player.hasNaN = true;
		return "NaN";
	};
	if (decimal.sign < 0) return "-" + format(decimal.neg(), precision, small);
	if (decimal.mag == Number.POSITIVE_INFINITY) return "Infinity";
	if (decimal.gte("eeee1000")) {
		var slog = decimal.slog();
		if (slog.gte(1e6)) return "F" + format(slog.floor());
		return decimal.pow(10, slog.sub(slog.floor())).toStringWithDecimalPlaces(3) + "F" + commaFormat(slog.floor(), 0);
	};
	if (decimal.gte("1e1000000")) return exponentialFormat(decimal, 0, false);
	if (decimal.gte("1e10000")) return exponentialFormat(decimal, 0);
	if (decimal.gte(1e9)) return exponentialFormat(decimal, precision);
	if (decimal.gte(1e3)) return commaFormat(decimal, 0);
	if (decimal.gte(0.0001) || !small) return regularFormat(decimal, precision);
	if (decimal.eq(0)) return (0).toFixed(precision);
	decimal = invertOOM(decimal);
	let val = "";
	if (decimal.lt("1e1000")) {
		val = exponentialFormat(decimal, precision);
		return val.replace(/([^(?:e|F)]*)$/, '-$1');
	};
	return format(decimal, precision) + "⁻¹";
};

function formatWhole(decimal) {
	decimal = new Decimal(decimal);
	if (decimal.gte(1e9)) return format(decimal, 2);
	if (decimal.lte(0.99) && !decimal.eq(0)) return format(decimal, 2);
	return format(decimal, 0);
};

function formatTime(s) {
	if (s < 60) return format(s) + "s";
	if (s < 3600) return formatWhole(Math.floor(s / 60)) + "m " + format(s % 60) + "s";
	if (s < 86400) return formatWhole(Math.floor(s / 3600)) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s";
	if (s < 31536000) return formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s";
	return formatWhole(Math.floor(s / 31536000)) + "y " + formatWhole(Math.floor(s / 86400) % 365) + "d " + formatWhole(Math.floor(s / 3600) % 24) + "h " + formatWhole(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s";
};

function toPlaces(x, precision, maxAccepted) {
	x = new Decimal(x);
	let result = x.toStringWithDecimalPlaces(precision);
	if (new Decimal(result).gte(maxAccepted)) result = new Decimal(maxAccepted - Math.pow(0.1, precision)).toStringWithDecimalPlaces(precision);
	return result;
};

// Will also display very small numbers
function formatSmall(x, precision = 2) {
	return format(x, precision, true);
};

function invertOOM(x) {
	let e = x.log10().ceil();
	let m = x.div(Decimal.pow(10, e));
	return new Decimal(10).pow(e.neg()).mul(m);
};
