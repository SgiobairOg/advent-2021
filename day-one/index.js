// Import data
import { data } from './data';

let increasingDepths = 0;
let increasingSums = 0;

// Solves for part one
data.forEach((startDepth, index, depths) => {
  const nextDepth = depths[index + 1];
  if (!nextDepth) return;
  if (nextDepth > startDepth) {
    increasingDepths += 1;
  }
  return;
});

const calculateWindow = function (depths, startIndex, size = 3) {
  const window = depths.slice(startIndex, size + startIndex);
  if (window.length < size) return undefined;
  return window.reduce((prev, curr) => {
    return prev + curr;
  }, 0);
};

// Solves for part two
data.forEach((baseWindowDepth, index, depths) => {
  const baseWindowSum = calculateWindow(depths, index);
  const nextWindowSum = calculateWindow(depths, index + 1);

  if (!baseWindowSum || !nextWindowSum) return;
  if (nextWindowSum > baseWindowSum) {
    increasingSums += 1;
  }
  return;
});

// Write Javascript code!
const appDiv = document.getElementById('app-day-one');
appDiv.innerHTML = `
  <p>Part One: ${increasingDepths} entries where depth increases</p>
  <p>Part Two: ${increasingSums} windows where depth increases</p>
`;
//console.log(appDiv);
