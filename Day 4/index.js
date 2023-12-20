"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://adventofcode.com/2023/day/3
var fs = require("fs");
var path = require("path");
var exampleInput = fs.readFileSync(path.resolve(__dirname, "example.txt"), "utf-8");
var mainInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
function getWinningNumbersOfCard(cardRow) {
    // Card [row]: [winning numbers] | [card numbers]
    // Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
    var _a = cardRow.split(":")[1].split("|"), winningNumbersStr = _a[0], cardNumbersStr = _a[1];
    var winningNumbers = winningNumbersStr
        .trim()
        .split(" ")
        .filter(function (x) { return !isNaN(parseInt(x)); });
    var cardNumbers = cardNumbersStr
        .trim()
        .split(" ")
        .filter(function (x) { return !isNaN(parseInt(x)); });
    var intersection = cardNumbers.filter(function (x) { return winningNumbers.includes(x); });
    return intersection;
}
function getCardRowWinningTotal(cardRow) {
    // Points = 2 ^ (x - 1) where x = # winning numbers
    var intersection = getWinningNumbersOfCard(cardRow);
    if (intersection.length === 0) {
        return 0;
    }
    var points = Math.pow(2, intersection.length - 1);
    console.log(intersection);
    console.log("Number: ".concat(intersection.length, ", Points: ").concat(points));
    return points;
}
function getCardTotalPoints(input) {
    var rows = input.split("\r\n");
    return rows.reduce(function (acc, row) {
        return acc + getCardRowWinningTotal(row);
    }, 0);
}
// const exampleTotal = getCardTotalPoints(exampleInput);
// console.log(exampleTotal);
// const inputTotal = getCardTotalPoints(mainInput);
// console.log(inputTotal);
// Part 2
// For each row
// Get how many winning numbers are in the card (values not important)
// Distribute the number of winnings on the subsequent cards
function getTotalCards(rows) {
    var count = 0;
    // Get cards and number of winning cards for each, starting with 1 of each
    var cards = rows.map(function (row, idx) {
        var winningNums = getWinningNumbersOfCard(row);
        // [Holding Total, Number of winning cards]
        return [1, winningNums.length];
    });
    for (var i = 0; i < cards.length; i++) {
        //add current card_amount to answer
        count += cards[i][0];
        //distribute winnings to next cards
        for (var j = 1; j <= cards[i][1]; j++) {
            cards[i + j][0] += cards[i][0];
        }
    }
    return count;
}
var exampleRows = exampleInput.split("\r\n");
console.log("Example", getTotalCards(exampleRows));
var inputRows = mainInput.split("\r\n");
console.log("Main", getTotalCards(inputRows));
