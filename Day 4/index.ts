// https://adventofcode.com/2023/day/3
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

function getWinningNumbersOfCard(cardRow: string) {
  // Card [row]: [winning numbers] | [card numbers]
  // Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53

  const [winningNumbersStr, cardNumbersStr] = cardRow.split(":")[1].split("|");
  const winningNumbers = winningNumbersStr
    .trim()
    .split(" ")
    .filter((x) => !isNaN(parseInt(x)));

  const cardNumbers = cardNumbersStr
    .trim()
    .split(" ")
    .filter((x) => !isNaN(parseInt(x)));

  const intersection = cardNumbers.filter((x) => winningNumbers.includes(x));
  return intersection;
}

function getCardRowWinningTotal(cardRow: string) {
  // Points = 2 ^ (x - 1) where x = # winning numbers

  const intersection = getWinningNumbersOfCard(cardRow);

  if (intersection.length === 0) {
    return 0;
  }
  const points = Math.pow(2, intersection.length - 1);

  console.log(intersection);
  console.log(`Number: ${intersection.length}, Points: ${points}`);

  return points;
}

function getCardTotalPoints(input: string) {
  const rows = input.split("\r\n");

  return rows.reduce((acc, row) => {
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

function getTotalCards(rows: string[]) {
  let count = 0;
  // Get cards and number of winning cards for each, starting with 1 of each
  const cards = rows.map((row, idx) => {
    const winningNums = getWinningNumbersOfCard(row);
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
const exampleRows = exampleInput.split("\r\n");
console.log("Example", getTotalCards(exampleRows));

const inputRows = mainInput.split("\r\n");

console.log("Main", getTotalCards(inputRows));
