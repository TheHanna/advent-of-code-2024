import { createReadStream } from "fs";
import path from "path";
import readline from "readline";

const leftList = [];
const rightList = [];

const inputPath = path.join(import.meta.dirname, "input.csv");
const input = createReadStream(inputPath, "utf8");

const lines = readline.createInterface({ input });

for await (const line of lines) {
  const [leftItem, rightItem] = line.split(",").map(Number);
  leftList.push(leftItem);
  rightList.push(rightItem);
}

leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

export { leftList, rightList };
