import { createReadStream } from "fs";
import path from "path";
import readline from "readline";

const inputPath = path.join(import.meta.dirname, "input.txt");
const input = createReadStream(inputPath, "utf8");

const lines = readline.createInterface({ input });

const defaultGrid = []

for await (const line of lines) {
  defaultGrid.push(line.split(''));
}

function getThreeByThreeSectionOfGrid(arr, x, y) {
  const section = [];
  for (let i = x; i < x + 3; i++) {
    const row = [];
    for (let j = y; j < y + 3; j++) {
      if (i < arr.length && j < arr[i].length) {
        row.push(arr[i][j])
      } else {
        break;
      }
    }
    section.push(row);
  }
  return section;
}

function sectionContainsXMas(section) {
  // If the middle letter of the section is not A, it can't be an X-MAS
  if (section[1][1] !== 'A') {
    return false;
  }
  // If the middle letter of the section is A, check the diagonals for MAS/SAM
  const diagonalTopLeftToBottomRight = `${section[0][0]}${section[1][1]}${section[2][2]}`.match(/MAS|SAM/g);
  const diagonalBottomLeftToTopRight = `${section[2][0]}${section[1][1]}${section[0][2]}`.match(/MAS|SAM/g);
  return diagonalBottomLeftToTopRight !== null && diagonalTopLeftToBottomRight !== null;
}

let totalMatches = 0;

for (let x = 0; x < defaultGrid.length - 2; x++) {
  for (let y = 0; y < defaultGrid[x].length - 2; y++) {
    const section = getThreeByThreeSectionOfGrid(defaultGrid, x, y);
    const containsXMas = sectionContainsXMas(section);
    if (containsXMas) {
      totalMatches++
    }
  }
}

console.log(totalMatches);
