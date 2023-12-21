// https://adventofcode.com/2023/day/5
import * as fs from "fs";
import * as path from "path";

const exampleInput = fs.readFileSync(
  path.resolve(__dirname, "example.txt"),
  "utf-8"
);

const mainInput = fs.readFileSync(
  path.resolve(__dirname, "input.txt"),
  "utf-8"
);

type MapStageExceptions = {
  destinationStart: number;
  sourceStart: number;
  range: number;
};

type SeedCategories = {
  seed: number;
  soil: number;
  fertilizer: number;
  water: number;
  light: number;
  temperature: number;
  humidity: number;
  location: number;
};

function getSeeds(input: string) {
  const blocks = input.split("\r\n\r\n");

  const seedsBlock = blocks.shift();

  // Get seed numbers from input
  const seeds = seedsBlock
    .split(":")[1]
    .replace("\r\n", " ")
    .trim()
    .split(" ")
    .map((seedNumString) => parseInt(seedNumString));

  return seeds;
}

function getCategories(seeds: number[], input: string) {
  const blocks = input.split("\r\n\r\n");

  // Blocks follow pattern of:
  // [name] map: [<destinationStart> <sourceStart> <range>]
  // console.log(JSON.stringify(exampleInput));

  //  Get maps of each stage
  const maps: Record<string, MapStageExceptions[]> = blocks
    .slice(1)
    .reduce((acc, curr) => {
      const name = curr.split(":")[0].split(" ")[0];
      const nums = curr
        .split(":")[1]
        .trim()
        .split("\r\n")
        .map((numSequence) => numSequence.trim().split(" "))
        .map((numBlock) => {
          const [destinationStart, sourceStart, range] = numBlock;
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
  const seedCategories: SeedCategories[] = seeds.map((seed) => {
    const mapStages = Object.entries(maps);
    const categories: SeedCategories = {
      seed,
      soil: -1,
      fertilizer: -1,
      water: -1,
      light: -1,
      temperature: -1,
      humidity: -1,
      location: -1,
    };

    mapStages.reduce((acc, [currMapName, currStage]) => {
      let num = acc;
      let inStageExceptionRange = false;
      const stageName = currMapName.split("-").pop();
      currStage.forEach((exceptions) => {
        if (
          acc >= exceptions.sourceStart &&
          acc < exceptions.sourceStart + exceptions.range
        ) {
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
function getSeedsFromRanges(input: string) {
  const blocks = input.split("\r\n\r\n");

  const seedsBlock = blocks.shift();

  // Get seed numbers from input
  const seedNums = seedsBlock
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
const mainInputSeeds = getSeedsFromRanges(mainInput);
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
