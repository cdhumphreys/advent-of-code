"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://adventofcode.com/2023/day/5
var fs = require("fs");
var path = require("path");
var exampleInput = fs.readFileSync(path.resolve(__dirname, "example.txt"), "utf-8");
var mainInput = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
function getSeeds(input) {
    var blocks = input.split("\r\n\r\n");
    var seedsBlock = blocks.shift();
    // Get seed numbers from input
    var seeds = seedsBlock
        .split(":")[1]
        .replace("\r\n", " ")
        .trim()
        .split(" ")
        .map(function (seedNumString) { return parseInt(seedNumString); });
    return seeds;
}
function getCategories(seeds, input) {
    var blocks = input.split("\r\n\r\n");
    // Blocks follow pattern of:
    // [name] map: [<destinationStart> <sourceStart> <range>]
    // console.log(JSON.stringify(exampleInput));
    //  Get maps of each stage
    var maps = blocks
        .slice(1)
        .reduce(function (acc, curr) {
        var name = curr.split(":")[0].split(" ")[0];
        var nums = curr
            .split(":")[1]
            .trim()
            .split("\r\n")
            .map(function (numSequence) { return numSequence.trim().split(" "); })
            .map(function (numBlock) {
            var _a = __read(numBlock, 3), destinationStart = _a[0], sourceStart = _a[1], range = _a[2];
            return {
                destinationStart: parseInt(destinationStart),
                sourceStart: parseInt(sourceStart),
                range: parseInt(range),
            };
        });
        acc[name] = nums;
        return acc;
    }, {});
    // Get map of seed to each stage
    var seedCategories = seeds.map(function (seed) {
        var mapStages = Object.entries(maps);
        var categories = {
            seed: seed,
            soil: -1,
            fertilizer: -1,
            water: -1,
            light: -1,
            temperature: -1,
            humidity: -1,
            location: -1,
        };
        mapStages.reduce(function (acc, _a) {
            var _b = __read(_a, 2), currMapName = _b[0], currStage = _b[1];
            var num = acc;
            var inStageExceptionRange = false;
            var stageName = currMapName.split("-").pop();
            currStage.forEach(function (exceptions) {
                if (acc >= exceptions.sourceStart &&
                    acc < exceptions.sourceStart + exceptions.range) {
                    inStageExceptionRange = true;
                    num += exceptions.destinationStart - exceptions.sourceStart;
                }
            });
            categories[stageName] = num;
            return num;
        }, seed);
        return categories;
    });
    return seedCategories;
}
// Example input
// const exampleCategories = getCategories(getSeeds(exampleInput), exampleInput);
// const exampleLowestLocation = exampleCategories
//   .map((category) => category.location)
//   .reduce((acc, curr) => {
//     if (curr < acc) {
//       return curr;
//     }
//     return acc;
//   }, Infinity);
// console.log(exampleLowestLocation);
// // Main Input
// const mainInputCategories = getCategories(getSeeds(mainInput), mainInput);
// const mainLowestLocation = mainInputCategories
//   .map((category) => category.location)
//   .reduce((acc, curr) => {
//     if (curr < acc) {
//       return curr;
//     }
//     return acc;
//   }, Infinity);
// console.log(mainLowestLocation);
// Part 2
// Seeds are pairs: <start> <range>
function getSeedsFromRanges(input) {
    var blocks = input.split("\r\n\r\n");
    var seedsBlock = blocks.shift();
    // Get seed numbers from input
    var seedNums = seedsBlock
        .split(":")[1]
        .replace("\r\n", " ")
        .trim()
        .split(" ");
    console.log(seedNums);
    //   const seeds = [];
    //   for (let i = 0; i < seedNums.length - 1; i += 2) {
    //     const start = parseInt(seedNums[i]);
    //     const range = parseInt(seedNums[i + 1]);
    //     for (let j = start; j < start + range; j++) {
    //       seeds.push(j);
    //     }
    //   }
    //   return seeds;
}
// Example input
// const exampleCategoriesPart2 = getCategories(
//   getSeedsFromRanges(exampleInput),
//   exampleInput
// );
// const exampleLowestLocationPart2 = exampleCategoriesPart2
//   .map((category) => category.location)
//   .reduce((acc, curr) => {
//     if (curr < acc) {
//       return curr;
//     }
//     return acc;
//   }, Infinity);
// console.log(exampleLowestLocationPart2);
// Main Input
var mainInputSeeds = getSeedsFromRanges(mainInput);
// console.log(mainInputSeeds.length);
// const mainCategoriesPart2 = getCategories(
//   getSeedsFromRanges(mainInput),
//   mainInput
// );
// const mainLowestLocationPart2 = mainCategoriesPart2
//   .map((category) => category.location)
//   .reduce((acc, curr) => {
//     if (curr < acc) {
//       return curr;
//     }
//     return acc;
//   }, Infinity);
// console.log(mainLowestLocationPart2);
