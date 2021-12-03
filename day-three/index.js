import { data } from './data';

// Part One

const bitHashMap = (obj, fn) => {
  const bitMap = [];
  for (let i = 0; i < Object.keys(obj).length; i++) {
    const value = fn(obj[i]);
    bitMap.push(value);
  }
  return bitMap;
};

const partOne = {
  gamma: {
    binary: '',
    decimal: 0,
  },
  epsilon: {
    binary: '',
    decimal: 0,
  },
  consumption: 0,
};

const dataBitHash = {};

data.forEach((entry) => {
  entry.forEach((bit, index) => {
    if (!dataBitHash[index]) dataBitHash[index] = {};

    if (!dataBitHash[index][bit]) {
      dataBitHash[index][bit] = 1;
    } else {
      dataBitHash[index][bit] += 1;
    }
  });
});

const mostCommonBits = bitHashMap(dataBitHash, (bits) =>
  bits[0] > bits[1] ? 0 : 1
);
partOne.gamma.binary = mostCommonBits.join('');

const leastCommonBits = bitHashMap(dataBitHash, (bits) =>
  bits[0] < bits[1] ? 0 : 1
);
partOne.epsilon.binary = leastCommonBits.join('');

partOne.gamma.decimal = parseInt(partOne.gamma.binary, 2);
partOne.epsilon.decimal = parseInt(partOne.epsilon.binary, 2);

const partTwo = {
  o2Rating: {
    binary: 0,
    decimal: 0,
  },
  co2Rating: {
    binary: 0,
    decimal: 0,
  },
};

Object.filter = (obj, predicate, index) => {
  return Object.assign(
    ...Object.keys(obj)
      .filter((key) => predicate(obj[key], index))
      .map((key) => ({ [key]: obj[key] }))
  );
};

const filterBitHashMap = (map, predicate, bit = 0) => {
  const filteredMap = Object.filter(map, predicate, bit);
  if (Object.keys(filteredMap).length === 1) return filteredMap;
  return filterBitHashMap(filteredMap, predicate, bit + 1);
};

const o2Rating = filterBitHashMap(data, (bitEntry, bit) => {
  return Number(bitEntry[bit]) === Number(mostCommonBits[bit]);
});

const co2Rating = filterBitHashMap(data, (bitEntry, bit) => {
  return Number(bitEntry[bit]) === Number(leastCommonBits[bit]);
});

partTwo.o2Rating.binary = Object.values(o2Rating)[0].join('');
partTwo.o2Rating.decimal = parseInt(partTwo.o2Rating.binary, 2);

partTwo.co2Rating.binary = Object.values(co2Rating)[0].join('');
partTwo.co2Rating.decimal = parseInt(partTwo.co2Rating.binary, 2);

// Handle Output
const appDiv = document.getElementById('app-day-three');
appDiv.innerHTML = `
  <p>Part One: <br>Gamma is ${partOne.gamma.decimal} (${
  partOne.gamma.binary
}) <br>Epsilon is ${partOne.epsilon.decimal} (${
  partOne.epsilon.binary
}) <br>Power consumption is: ${
  partOne.gamma.decimal * partOne.epsilon.decimal
} </p>
<p>Part One: <br>O2 Rating is ${partTwo.o2Rating.decimal} (${
  partTwo.o2Rating.binary
}) <br>CO2 Rating is ${partTwo.co2Rating.decimal} (${
  partTwo.co2Rating.binary
}) <br>Life Support Rating is: ${
  partTwo.o2Rating.decimal * partTwo.co2Rating.decimal
} <br>Currently wrong.</p>
`;
