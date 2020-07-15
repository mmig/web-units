;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function () {
            return factory();
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals
        root.Angle = factory();
    }
}(typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : this, function () {
"use strict"

var Angle = {},
	units = ['Deg', 'Rad', 'Grad', 'Turn'],
	unitValue = [180, Math.PI, 2, 0.5],
	conversions = {},
	runits = /^([\+\-]=)?(-?[\d+.\-]+)([a-z]+|%)(.*?)$/i,
	parseValue,
	i = 4,
	j,
	unit;

parseValue = Angle.parseValue = function (string) {
	var matches = string.match(runits);
	// TODO: matches[4] holds other values that are potentially in a list
	return {
		prefix: matches[1],
		value: matches[2],
		unit: matches[3]
	};
};

// create functions for each unit
while (i--) {
	unit = units[i].toLowerCase();
	j = units.length;

	// calculate the conversions
	while (j--) {
		if (j === i) { continue; }
		conversions[unit + units[j]] = unitValue[j]/unitValue[i];
	}

	// create functions for each unit
	(function(toUnit, toUnitLower) {
		Angle['to' + toUnit] = function (value) {
			// overloading
			if (!value.unit) {
				value = parseValue(value);
			}

			var val = value.value * 1, // convert to a number
				unit = value.unit;

			return unit === toUnitLower ? val : val * conversions[unit + toUnit];
		};
	})(units[i], unit);
}

// export angle converter
return Angle;

}));
