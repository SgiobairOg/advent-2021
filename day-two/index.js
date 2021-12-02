import { data } from './data';

let depth = 0;
let distance = 0;

const MOVEMENT = {
  forward: (travelledDistance) => (distance += travelledDistance),
  down: (depthAdjust) => (depth += depthAdjust),
  up: (depthAdjust) => (depth -= depthAdjust),
};

let partTwoDepth = 0;
let partTwoDistance = 0;
let aim = 0;

const PART_TWO_MOVEMENT = {
  forward: (travelledDistance) => {
    partTwoDistance += travelledDistance;
    partTwoDepth += aim * travelledDistance;
  },
  down: (aimAdjust) => (aim += aimAdjust),
  up: (aimAdjust) => (aim -= aimAdjust),
};

data.forEach((entry) => {
  MOVEMENT[entry.command](entry.value);
  PART_TWO_MOVEMENT[entry.command](entry.value);
});

// Handle Output
const appDiv = document.getElementById('app-day-two');
appDiv.innerHTML = `
  <p>Part One: Final depth is ${depth}, distance covered was ${distance}. Solution is ${
  depth * distance
}</p>
<p>Part Two: Final depth is ${partTwoDepth}, distance covered was ${partTwoDistance}. Solution is ${
  partTwoDepth * partTwoDistance
}</p>
`;
