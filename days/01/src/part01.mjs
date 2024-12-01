import { leftList, rightList } from "./makeLists.mjs";

let totalDistance = 0;

for (let i = 0; i < leftList.length; i++) {
  const leftItem = leftList[i];
  const rightItem = rightList[i];

  const distance = Math.abs(leftItem - rightItem);

  totalDistance += distance;
}

console.log(totalDistance);
