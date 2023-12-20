"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://adventofcode.com/2023/day/3
var fs = require("fs");
var path = require("path");
var exampleInput = fs.readFileSync(path.resolve(__dirname, "example.txt"), "utf-8");
var numberRegex = /[\d]+/g;
var allSymbolsRegex = /[^aA-zZ.\d\s]/g;
var mainInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
function getIndices(input, regexExp) {
    var e_1, _a, e_2, _b;
    // Remove new line characters
    var trimmedInput = input.replace(/\r\n/g, "");
    var numberMatches = trimmedInput.matchAll(numberRegex);
    var symbolMatches = trimmedInput.matchAll(regexExp);
    // Get locations and characters of the numbers
    var numberIndices = [];
    try {
        for (var numberMatches_1 = __values(numberMatches), numberMatches_1_1 = numberMatches_1.next(); !numberMatches_1_1.done; numberMatches_1_1 = numberMatches_1.next()) {
            var match = numberMatches_1_1.value;
            numberIndices.push({ symbol: match[0], index: match.index });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (numberMatches_1_1 && !numberMatches_1_1.done && (_a = numberMatches_1.return)) _a.call(numberMatches_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    // Get locations and value of the symbols
    var symbolIndices = [];
    try {
        for (var symbolMatches_1 = __values(symbolMatches), symbolMatches_1_1 = symbolMatches_1.next(); !symbolMatches_1_1.done; symbolMatches_1_1 = symbolMatches_1.next()) {
            var match = symbolMatches_1_1.value;
            symbolIndices.push({ symbol: match[0], index: match.index });
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (symbolMatches_1_1 && !symbolMatches_1_1.done && (_b = symbolMatches_1.return)) _b.call(symbolMatches_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return { symbolIndices: symbolIndices, numberIndices: numberIndices };
}
function getLocationsToCheck(columns, startIndex) {
    // Top left, Top middle, top right
    // Left, Right
    // Bottom left, Bottom middle, bottom right
    return [
        // Top
        startIndex - columns - 1,
        startIndex - columns,
        startIndex - columns + 1,
        // Middle
        startIndex - 1,
        startIndex + 1,
        // Bottom
        startIndex + columns - 1,
        startIndex + columns,
        startIndex + columns + 1,
    ];
}
function getMatches(input, regexExp) {
    // console.log(exampleInput);
    var COLS = input.trim().indexOf("\r\n");
    var _a = getIndices(input, regexExp), symbolIndices = _a.symbolIndices, numberIndices = _a.numberIndices;
    var matches = [];
    // Check each of the cardinal directions 1 space
    symbolIndices.forEach(function (symbol) {
        var locationsToCheck = getLocationsToCheck(COLS, symbol.index);
        numberIndices.forEach(function (num) {
            // Get the range of indices that the number characters inhabit
            var range = num.symbol.split("").map(function (char, idx) { return num.index + idx; });
            //   Find any intersection between the adjacent indices & the number indices
            var intersection = locationsToCheck.filter(function (x) { return range.includes(x); });
            // If any match then add to the results array
            if (intersection.length) {
                matches.push(parseInt(num.symbol));
            }
        });
    });
    return matches;
}
var exampleMatches = getMatches(exampleInput, allSymbolsRegex);
var exampleMatchesSum = exampleMatches.reduce(function (acc, curr) { return acc + curr; });
console.log(exampleMatchesSum);
var mainInputMatches = getMatches(mainInput, allSymbolsRegex);
var mainInputMatchesSum = mainInputMatches.reduce(function (acc, curr) { return acc + curr; });
console.log(mainInputMatchesSum);
// Part 2
function getAdjacentGearMatches(input) {
    var gearRegex = /[\*]/g;
    var COLS = input.trim().indexOf("\r\n");
    var _a = getIndices(input, gearRegex), symbolIndices = _a.symbolIndices, numberIndices = _a.numberIndices;
    var matches = [];
    // Check each of the cardinal directions 1 space
    symbolIndices.forEach(function (symbol) {
        var locationsToCheck = getLocationsToCheck(COLS, symbol.index);
        var symbolMatches = [];
        numberIndices.forEach(function (num) {
            // Get the range of indices that the number characters inhabit
            var range = num.symbol.split("").map(function (char, idx) { return num.index + idx; });
            //   Find any intersection between the adjacent indices & the number indices
            var intersection = locationsToCheck.filter(function (x) { return range.includes(x); });
            // If any match then add to the results array
            if (intersection.length) {
                if (!isNaN(parseInt(num.symbol))) {
                    symbolMatches.push(parseInt(num.symbol));
                }
            }
        });
        matches.push(symbolMatches);
    });
    return matches;
}
var gearMatches = getAdjacentGearMatches(exampleInput);
var gearRatioSum = gearMatches
    .filter(function (x) { return x.length === 2; })
    .reduce(function (acc, curr) {
    return acc + curr[0] * curr[1];
}, 0);
console.log(gearRatioSum);
var mainGearMatches = getAdjacentGearMatches(mainInput);
var mainGearRatioSum = mainGearMatches
    .filter(function (x) { return x.length === 2; })
    .reduce(function (acc, curr) {
    return acc + curr[0] * curr[1];
}, 0);
console.log(mainGearRatioSum);
