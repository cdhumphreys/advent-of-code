// https://adventofcode.com/2023/day/1

import data from "./data";

// Part 1
const examples = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];

function getFirstAndLastDigits(characters: string) {
  let first: number | undefined;
  let last: number | undefined;

  const revCharacters = characters.split("").reverse().join("");
  for (let i = 0; i < characters.length; i++) {
    if (!first && !isNaN(parseInt(characters[i]))) {
      first = parseInt(characters[i]);
    }
    if (!last && !isNaN(parseInt(revCharacters[i]))) {
      last = parseInt(revCharacters[i]);
    }
    if (first && last) break;
  }

  if (first && last) {
    return parseInt(`${first}${last}`);
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
const examples2 = [
  "two1nine",
  "eightwothree",
  "abcone2threexyz",
  "xtwone3four",
  "4nineeightseven2",
  "zoneight234",
  "7pqrstsixteen",
];

function getFirstAndLastDigitsV2(characters: string) {
  const acceptableSubstrings = [
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

  type foundEntry = {
    value: number;
    index: number;
  };
  const found: foundEntry[] = [];

  // Get all "written" numbers and their positions
  acceptableSubstrings.forEach((substr, substringEntryIdx) => {
    for (let i = 0; i < characters.length; i++) {
      let slice = characters.substring(i, i + substr.length);

      if (slice === substr) {
        found.push({ value: substringEntryIdx + 1, index: i });
      }
    }
  });

  // Get all numbers and their positions
  characters.split("").forEach((str, idx) => {
    if (!isNaN(parseInt(str))) {
      found.push({ value: parseInt(str), index: idx });
    }
  });

  // Order by position
  found.sort((a, b) => {
    if (a.index > b.index) return 1;
    if (a.index < b.index) return -1;
    return 0;
  });

  // Return result if any
  if (found.length) {
    // Get first and last, join together & parse
    return parseInt(`${found[0].value}${found[found.length - 1].value}`);
  }

  // Return 0 otherwise
  return 0;
}

console.log(data.reduce((acc, curr) => acc + getFirstAndLastDigitsV2(curr), 0));
// const dataTotal = data.reduce(
//   (acc, curr) => acc + getFirstAndLastDigits(curr),
//   0
// );
// console.log(dataTotal);
