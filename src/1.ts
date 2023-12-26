import { input } from './1.data';

const sumNumbers = (lines: string[]) => {
  const numbers = lines.map((line) => line.replaceAll(/[^0-9]/g, ''));

  const numbersToAdd = numbers.map((item) => {
    if (item.length === 2) {
      return item;
    }
    if (item.length === 1) {
      return `${item}${item}`;
    }
    const singleNumbers = item.split('');
    return `${singleNumbers[0]}${singleNumbers[singleNumbers.length - 1]}`;
  });
  return numbersToAdd.reduce((acc, item) => {
    return acc + +item;
  }, 0);
};

export const calculateCalibrationValues = () => {
  const lines = input.split(/\r?\n/);

  return sumNumbers(lines);
};

const replaceMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

// not working approach
export const calculateCalibrationValuesGoldenObsolete = () => {
  const lines = input.split(/\r?\n/);

  const parsedLines = lines.map((line) => {
    const numbersOccurences = [];
    for (let key in replaceMap) {
      const regex = new RegExp(key, 'gi');
      const indexOfKey = line.indexOf(key);
      if (indexOfKey >= 0) {
        numbersOccurences.push([indexOfKey, key]);
      }
    }
    let replacedStringWithNumbers = line;

    const sortedOccurences = numbersOccurences.sort((a, b) => {
      return a[0] - b[0];
    });
    sortedOccurences.forEach((occurrence, index) => {
      if (index === 0 || index === sortedOccurences.length - 1) {
        const regex = new RegExp(occurrence[1], 'g');
        replacedStringWithNumbers = replacedStringWithNumbers.replaceAll(
          regex,
          `${replaceMap[occurrence[1]]}${occurrence[1]}`
        );
      }
    });
    return replacedStringWithNumbers;
  });

  return sumNumbers(parsedLines);
};

export const calculateCalibrationValuesGolden = () => {
  const lines = input.split(/\r?\n/);
  const replaceMapKeys = Object.keys(replaceMap);

  const maxLength = Math.max(...replaceMapKeys.map((key) => key.length));

  const numberPairs = lines.map((line) => {
    const chars = line.split('');
    const foundNumbers = [];
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      if (char.match(/[1-9]/)) {
        foundNumbers.push(+char);
        continue;
      }
      let concatString = char;
      for (let j = i + 1; j < maxLength + i && j <= chars.length - 1; j++) {
        concatString = concatString + chars[j];
        if (replaceMapKeys.find((key) => key === concatString)) {
          foundNumbers.push(replaceMap[concatString]);
        }
      }
    }
    if (foundNumbers.length === 1) {
      return +`${foundNumbers[0]}${foundNumbers[0]}`;
    }
    return +`${foundNumbers[0]}${foundNumbers[foundNumbers.length - 1]}`;
  });

  return numberPairs.reduce((acc, item) => {
    return acc + item;
  }, 0);
};
