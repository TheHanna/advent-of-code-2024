import { createReadStream } from "fs";
import path from "path";
import readline from "readline";

const inputPath = path.join(import.meta.dirname, "input.txt");
const input = createReadStream(inputPath, "utf8");

const lines = readline.createInterface({ input });

function getValidMulInstructions(line) {
  return line.match(/mul\(\d*,\d*\)/g);
}

function parseNumbersFromInstruction(instruction) {
  return instruction.replace('mul(', '').replace(')', '').split(',').map(Number)
}

function executeInstruction(instruction) {
  const [a, b] = parseNumbersFromInstruction(instruction);
  return a * b;
}

let totalResult = 0;

for await (const line of lines) {
  const instructions = getValidMulInstructions(line);
  for (const instruction of instructions) {
    const result = executeInstruction(instruction);
    totalResult += result;
  }
}

console.log(totalResult);
