import { createReadStream } from "fs";
import path from "path";
import readline from "readline";

const inputPath = path.join(import.meta.dirname, "input.txt");
const input = createReadStream(inputPath, "utf8");

const lines = readline.createInterface({ input });

function parseLine(line) {
  return line.split(" ").map(Number);
}

function checkLevels(levels) {
  // Copy and sort the levels to check if values are increasing
  const sortedLevels = [...levels];
  sortedLevels.sort((a, b) => a - b);
  // Make a reversed copy to check if values are decreasing
  const reversedSortedLevels = [...sortedLevels];
  reversedSortedLevels.reverse();

  // Check that the values in the array are either increasing or decreasing
  const isIncreasing = levels.reduce((acc, value, i, arr) => {
    if (!acc) {
      return false;
    }
    if (i === 0) {
      return true;
    }
    return value > arr[i - 1];
  }, true);

  const isDecreasing = levels.reduce((acc, value, i, arr) => {
    if (!acc) {
      return false;
    }
    if (i === 0) {
      return true;
    }
    return value < arr[i - 1];
  });

  if (!isIncreasing && !isDecreasing) {
    return false;
  }

  // Check that the intervals between values are less than three but not zero
  for (let i = 0; i < levels.length - 1; i++) {
    const difference = Math.abs(levels[i] - levels[i + 1]);
    if (difference > 3 || difference === 0) {
      return false;
    }
  }

  return true;
}

let totalSafeReports = 0;

for await (const line of lines) {
  const levels = parseLine(line);
  let passesChecks = checkLevels(levels);
  if (passesChecks) {
    totalSafeReports++;
    continue;
  } else {
    for (let i = 0; i < levels.length; i++) {
      const partialLevels = [...levels];
      partialLevels.splice(i, 1);
      const passes = checkLevels(partialLevels);
      if (passes) {
        totalSafeReports++;
        break;
      }
    }
  }
}

console.log(totalSafeReports);
