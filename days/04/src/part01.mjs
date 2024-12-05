import { createReadStream } from "fs";
import path from "path";
import readline from "readline";

const inputPath = path.join(import.meta.dirname, "input.txt");
const input = createReadStream(inputPath, "utf8");

const lines = readline.createInterface({ input });

const defaultGrid = []
const verticalTransposeGrid = [];
const diagonalTopToBottomTransposeGrid = [];
const diagonalBottomToTopTransposeGrid = [];

for await (const line of lines) {
  defaultGrid.push(line.split(''));
  for (let i = 0; i < line.length; i++) {
    if (!verticalTransposeGrid[i]) {
      verticalTransposeGrid.push([line[i]])
    } else {
      verticalTransposeGrid[i].push(line[i]);
    }
  }
}

const reversedDefaultGrid = [...defaultGrid].map((row) => row.slice().reverse());

for (let i = 0; i < 2 * defaultGrid.length - 1; ++i) {
  diagonalTopToBottomTransposeGrid[i] = [];
  diagonalBottomToTopTransposeGrid[i] = [];
  for (let j = Math.min(i, defaultGrid.length - 1); j > Math.max(-1, i - defaultGrid.length); --j) {
    diagonalTopToBottomTransposeGrid[i].push(defaultGrid[j][i - j])
    diagonalBottomToTopTransposeGrid[i].push(reversedDefaultGrid[j][i - j]);
  }
}

let totalMatches = 0;

function findMatches(value) {
  const forwardMatches = value.match(/XMAS/g) ?? [];
  const reverseMatches = value.match(/SAMX/g) ?? [];
  return [...forwardMatches, ...reverseMatches];
}

function countMatches(row) {
  if (row.length > 3) {
    const value = row.join('');
    const matches = findMatches(value);
    if (matches) {
      totalMatches += matches.length;
    }
  } 
}

defaultGrid.forEach(countMatches)
verticalTransposeGrid.forEach(countMatches);
diagonalBottomToTopTransposeGrid.forEach(countMatches);
diagonalTopToBottomTransposeGrid.forEach(countMatches);

console.log(totalMatches);
