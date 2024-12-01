import { leftList, rightList } from "./makeLists.mjs";

let similarityScore = 0;

for (let i = 0; i < leftList.length; i++) {
  const leftItem = leftList[i];
  const occurrences = rightList.filter((rightItem) => leftItem === rightItem);
  const result = leftItem * occurrences.length;
  similarityScore += result;
}

console.log(similarityScore);
