"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://adventofcode.com/2023/day/2
var fs = require("fs");
var path = require("path");
var txtInput = fs
    .readFileSync(path.resolve(__dirname, "data.txt"), "utf-8")
    .split("\r\n");
// console.log(txtInput);
var exampleInput = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green".split("\n");
function getFormattedGames(gameEntries) {
    var formattedLines = gameEntries.map(function (line, idx) {
        var gameResults = line.split(":")[1];
        var games = gameResults.split(";").map(function (res) { return res.trim().split(", "); });
        //   Get object for each "round" with
        var formattedGames = games.map(function (game) {
            var rounds = game
                .map(function (round) {
                var _a;
                var _b = round.split(" "), number = _b[0], colour = _b[1];
                return _a = {}, _a[colour] = parseInt(number), _a;
            })
                .reduce(function (acc, curr) {
                return __assign(__assign({}, acc), curr);
            }, {});
            return rounds;
        });
        return formattedGames;
    });
    return formattedLines;
}
var CUBES_LIMIT = { red: 12, green: 13, blue: 14 };
// Sum the IDs of all valid games based on the Cubes in the bag
function getValidIdsTotal(input) {
    return getFormattedGames(input)
        .map(function (game, idx) {
        var allowed = true;
        game.forEach(function (round) {
            if (round.red > CUBES_LIMIT.red ||
                round.green > CUBES_LIMIT.green ||
                round.blue > CUBES_LIMIT.blue) {
                allowed = false;
            }
        });
        return allowed ? idx + 1 : 0;
    })
        .reduce(function (acc, curr) { return acc + curr; });
}
var allowedGamesExampleIdTotal = getValidIdsTotal(exampleInput);
console.log("Example ID Sum", allowedGamesExampleIdTotal);
var allowedGamesInputIdTotal = getValidIdsTotal(txtInput);
console.log("Input ID Sum", allowedGamesInputIdTotal);
// Part 2
function getSumPowers(input) {
    var formattedExample = getFormattedGames(input);
    var maxSets = formattedExample.map(function (game) {
        var maxRed = 0;
        var maxGreen = 0;
        var maxBlue = 0;
        game.forEach(function (round) {
            var red = round.red, green = round.green, blue = round.blue;
            if (red > maxRed)
                maxRed = red;
            if (green > maxGreen)
                maxGreen = green;
            if (blue > maxBlue)
                maxBlue = blue;
        });
        return { red: maxRed, green: maxGreen, blue: maxBlue };
    });
    var powers = maxSets.map(function (maxSet) {
        return Object.values(maxSet).reduce(function (acc, val) { return acc * val; });
    });
    var sum = powers.reduce(function (acc, curr) { return acc + curr; });
    return sum;
}
console.log("Example Sum of Powers", getSumPowers(exampleInput));
console.log("Input Sum of Powers", getSumPowers(txtInput));
// console.log(getSumPowers(exampleInput));
