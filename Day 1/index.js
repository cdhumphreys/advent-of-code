"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("./data");
var examples = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];
function getFirstAndLastDigits(characters) {
    var first;
    var last;
    var revCharacters = characters.split("").reverse().join("");
    for (var i = 0; i < characters.length; i++) {
        if (!first && !isNaN(parseInt(characters[i]))) {
            first = parseInt(characters[i]);
        }
        if (!last && !isNaN(parseInt(revCharacters[i]))) {
            last = parseInt(revCharacters[i]);
        }
        if (first && last)
            break;
    }
    if (first && last) {
        return parseInt("".concat(first).concat(last));
    }
    return 0;
}
// const digits = examples.map((chars) => getFirstAndLastDigits(chars));
// const total = digits.reduce((acc, curr) => acc + curr);
// console.log(digits);
// console.log(total);
// const dataTotal = data.reduce(
//   (acc, curr) => acc + getFirstAndLastDigits(curr),
//   0
// );
// console.log(dataTotal);
// Part 2
var examples2 = [
    "two1nine",
    "eightwothree",
    "abcone2threexyz",
    "xtwone3four",
    "4nineeightseven2",
    "zoneight234",
    "7pqrstsixteen",
];
function getFirstAndLastDigitsV2(characters) {
    var acceptableSubstrings = [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
    ];
    var found = [];
    // Get all "written" numbers and their positions
    acceptableSubstrings.forEach(function (substr, substringEntryIdx) {
        for (var i = 0; i < characters.length; i++) {
            var slice = characters.substring(i, i + substr.length);
            if (slice === substr) {
                found.push({ value: substringEntryIdx + 1, index: i });
            }
        }
    });
    // Get all numbers and their positions
    characters.split("").forEach(function (str, idx) {
        if (!isNaN(parseInt(str))) {
            found.push({ value: parseInt(str), index: idx });
        }
    });
    // Order by position
    found.sort(function (a, b) {
        if (a.index > b.index)
            return 1;
        if (a.index < b.index)
            return -1;
        return 0;
    });
    // Return result if any
    if (found.length) {
        // Get first and last, join together & parse
        return parseInt("".concat(found[0].value).concat(found[found.length - 1].value));
    }
    // Return 0 otherwise
    return 0;
}
console.log(data_1.default.reduce(function (acc, curr) { return acc + getFirstAndLastDigitsV2(curr); }, 0));
// const dataTotal = data.reduce(
//   (acc, curr) => acc + getFirstAndLastDigits(curr),
//   0
// );
// console.log(dataTotal);
