// https://adventofcode.com/2023/day/3
import * as fs from "fs";
import * as path from "path";

type Locations = {
  symbol: string;
  index: number;
};

const exampleInput = fs.readFileSync(
  path.resolve(__dirname, "example.txt"),
  "utf-8"
);

const numberRegex = /[\d]+/g;
const allSymbolsRegex = /[^aA-zZ.\d\s]/g;

const mainInput = fs.readFileSync(
  path.resolve(__dirname, "input.txt"),
  "utf-8"
);

function getIndices(input: string, regexExp: RegExp) {
  // Remove new line characters
  const trimmedInput = input.replace(/\r\n/g, "");

  const numberMatches = trimmedInput.matchAll(numberRegex);
  const symbolMatches = trimmedInput.matchAll(regexExp);

  // Get locations and characters of the numbers
  const numberIndices: Locations[] = [];
  for (const match of numberMatches) {
    numberIndices.push({ symbol: match[0], index: match.index });
  }

  // Get locations and value of the symbols
  const symbolIndices: Locations[] = [];
  for (const match of symbolMatches) {
    symbolIndices.push({ symbol: match[0], index: match.index });
  }
  return { symbolIndices, numberIndices };
}

function getLocationsToCheck(columns: number, startIndex: number) {
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

function getMatches(input: string, regexExp: RegExp) {
  // console.log(exampleInput);
  const COLS = input.trim().indexOf("\r\n");

  const {
    symbolIndices,
    numberIndices,
  }: { symbolIndices: Locations[]; numberIndices: Locations[] } = getIndices(
    input,
    regexExp
  );

  const matches: number[] = [];

  // Check each of the cardinal directions 1 space
  symbolIndices.forEach((symbol) => {
    const locationsToCheck = getLocationsToCheck(COLS, symbol.index);

    numberIndices.forEach((num) => {
      // Get the range of indices that the number characters inhabit
      const range = num.symbol.split("").map((char, idx) => num.index + idx);
      //   Find any intersection between the adjacent indices & the number indices
      const intersection = locationsToCheck.filter((x) => range.includes(x));
      // If any match then add to the results array
      if (intersection.length) {
        matches.push(parseInt(num.symbol));
      }
    });
  });

  return matches;
}

const exampleMatches = getMatches(exampleInput, allSymbolsRegex);
const exampleMatchesSum = exampleMatches.reduce((acc, curr) => acc + curr);

console.log(exampleMatchesSum);

const mainInputMatches = getMatches(mainInput, allSymbolsRegex);
const mainInputMatchesSum = mainInputMatches.reduce((acc, curr) => acc + curr);
console.log(mainInputMatchesSum);

// Part 2
function getAdjacentGearMatches(input: string) {
  const gearRegex = /[\*]/g;
  const COLS = input.trim().indexOf("\r\n");

  const {
    symbolIndices,
    numberIndices,
  }: { symbolIndices: Locations[]; numberIndices: Locations[] } = getIndices(
    input,
    gearRegex
  );
  const matches: number[][] = [];

  // Check each of the cardinal directions 1 space
  symbolIndices.forEach((symbol) => {
    const locationsToCheck = getLocationsToCheck(COLS, symbol.index);
    const symbolMatches: number[] = [];
    numberIndices.forEach((num) => {
      // Get the range of indices that the number characters inhabit
      const range = num.symbol.split("").map((char, idx) => num.index + idx);
      //   Find any intersection between the adjacent indices & the number indices
      const intersection = locationsToCheck.filter((x) => range.includes(x));
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

const gearMatches = getAdjacentGearMatches(exampleInput);

const gearRatioSum = gearMatches
  .filter((x) => x.length === 2)
  .reduce((acc, curr) => {
    return acc + curr[0] * curr[1];
  }, 0);
console.log(gearRatioSum);

const mainGearMatches = getAdjacentGearMatches(mainInput);

const mainGearRatioSum = mainGearMatches
  .filter((x) => x.length === 2)
  .reduce((acc, curr) => {
    return acc + curr[0] * curr[1];
  }, 0);
console.log(mainGearRatioSum);
