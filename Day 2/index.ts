// https://adventofcode.com/2023/day/2
import * as fs from "fs";
import * as path from "path";

type Round = {
  red?: number;
  green?: number;
  blue?: number;
};

type Game = Round[];

const txtInput = fs
  .readFileSync(path.resolve(__dirname, "data.txt"), "utf-8")
  .split("\r\n");
// console.log(txtInput);

const exampleInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`.split("\n");

function getFormattedGames(gameEntries: string[]) {
  const formattedLines: Game[] = gameEntries.map((line, idx) => {
    const gameResults = line.split(":")[1];
    const games = gameResults.split(";").map((res) => res.trim().split(", "));
    //   Get object for each "round" with
    const formattedGames: Round[] = games.map((game) => {
      const rounds = game
        .map((round) => {
          const [number, colour] = round.split(" ");

          return { [colour]: parseInt(number) };
        })
        .reduce((acc, curr) => {
          return { ...acc, ...curr };
        }, {});
      return rounds;
    });
    return formattedGames;
  });
  return formattedLines;
}

const CUBES_LIMIT = { red: 12, green: 13, blue: 14 };

// Sum the IDs of all valid games based on the Cubes in the bag
function getValidIdsTotal(input: string[]) {
  return getFormattedGames(input)
    .map((game, idx) => {
      let allowed = true;
      game.forEach((round: Round) => {
        if (
          round.red > CUBES_LIMIT.red ||
          round.green > CUBES_LIMIT.green ||
          round.blue > CUBES_LIMIT.blue
        ) {
          allowed = false;
        }
      });
      return allowed ? idx + 1 : 0;
    })
    .reduce((acc, curr) => acc + curr);
}

const allowedGamesExampleIdTotal = getValidIdsTotal(exampleInput);
console.log("Example ID Sum", allowedGamesExampleIdTotal);

const allowedGamesInputIdTotal = getValidIdsTotal(txtInput);
console.log("Input ID Sum", allowedGamesInputIdTotal);

// Part 2

function getSumPowers(input: string[]) {
  const formattedExample = getFormattedGames(input);

  const maxSets = formattedExample.map((game) => {
    let maxRed = 0;
    let maxGreen = 0;
    let maxBlue = 0;

    game.forEach((round) => {
      const { red, green, blue } = round;
      if (red > maxRed) maxRed = red;
      if (green > maxGreen) maxGreen = green;
      if (blue > maxBlue) maxBlue = blue;
    });
    return { red: maxRed, green: maxGreen, blue: maxBlue };
  });

  const powers = maxSets.map((maxSet) =>
    Object.values(maxSet).reduce((acc, val) => acc * val)
  );

  const sum = powers.reduce((acc, curr) => acc + curr);

  return sum;
}

console.log("Example Sum of Powers", getSumPowers(exampleInput));
console.log("Input Sum of Powers", getSumPowers(txtInput));
// console.log(getSumPowers(exampleInput));
