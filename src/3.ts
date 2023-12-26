import { edgeCase, input, inputTest } from './3.data';

const isNumber = (char: string) => /([0-9])/.test(char);

const isDot = (char: string) => /(\.)/.test(char);

const isSymbol = (char: string) => !isNumber(char) && !isDot(char);

const isNumberInRange = (
    charIndex: number,
    symbolIndex: number,
    length: number
) => {
    return symbolIndex >= charIndex - length && symbolIndex <= charIndex + 1;
};

const getSymbolIndices = (line: string): number[] => {
    return line
        .split('')
        .map((char, index) => ({ char, index }))
        .filter((item) => isSymbol(item.char))
        .map((item) => item.index);
};

const isSymbolInRange = (
    symbolIndices: number[],
    charIndex: number,
    length: number
) => {
    return symbolIndices.some((symbolIndex) =>
        isNumberInRange(charIndex, symbolIndex, length)
    );
};

// first approach not working for single numbers I think
export const calculateEnginePart = () => {
    const lines = inputTest.split(/\r?\n/);

    const foundNumbers = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
        const previousLine = i - 1 >= 0 ? lines[i - 1] : '';
        const charsLine = line.split('');
        const charsNextLine = nextLine.split('');
        let foundNumber = '';
        for (let j = 0; j < charsLine.length; j++) {
            const currentChar = charsLine[j];
            const nextChar = j + 1 < charsLine.length ? charsLine[j + 1] : '';
            const previousChar = j - 1 >= 0 ? charsLine[j - 1] : '';
            if (isNumber(currentChar)) {
                foundNumber += currentChar;
                if (isDot(nextChar)) {
                    const symbolIndicesPrevious = getSymbolIndices(previousLine);
                    const symbolIndicesNext = getSymbolIndices(nextLine);
                    if (isSymbolInRange(symbolIndicesNext, j, foundNumber.length)) {
                        foundNumbers.push(foundNumber);
                    } else if (
                        isSymbolInRange(symbolIndicesPrevious, j, foundNumber.length)
                    ) {
                        foundNumbers.push(foundNumber);
                    }
                    foundNumber = '';
                }
                if (isSymbol(nextChar)) {
                    foundNumbers.push(foundNumber);
                    foundNumber = '';
                }
                if (isSymbol(previousChar)) {
                    for (let n = j + 1; n < j + 4; n++) {
                        const nextChar2 = charsLine[n];
                        if (isNumber(nextChar2)) {
                            foundNumber += nextChar2;
                        } else {
                            foundNumbers.push(foundNumber);
                            foundNumber = '';
                            break;
                        }
                    }
                }
            }
        }
    }
    return foundNumbers.reduce((acc, foundNumber) => {
        return (acc += +foundNumber);
    }, 0);
};

const searchCoordinates = [
    [-1, 1],
    [0, 1],
    [1, 1],
    [-1, 0],
    [1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
];

const findNumber = (chars: string[], start: number) => {
    let foundNumber = chars[start];
    for (let i = start + 1; i < chars.length; i++) {
        const nextChar = chars[i];
        if (isDot(nextChar) || isSymbol(nextChar)) {
            break;
        }
        foundNumber = `${foundNumber}${nextChar}`;
    }
    for (let i = start - 1; i >= 0; i--) {
        const previousChar = chars[i];
        if (isDot(previousChar) || isSymbol(previousChar)) {
            break;
        }
        foundNumber = `${previousChar}${foundNumber}`;
    }
    return foundNumber;
};

export const calculateGearRatio = () => {
    const lines = input.split(/\r?\n/);
    const symbolCoordinates = [];

    let numberOfChars = 0;
    lines.forEach((line, lineIndex) => {
        const chars = line.split('');
        numberOfChars = chars.length;
        chars.forEach((char, charIndex) => {
            if (isSymbol(char)) {
                symbolCoordinates.push([lineIndex, charIndex]);
            }
        });
    });

    let foundNumbers = [];
    symbolCoordinates.forEach(([symbolX, symbolY]) => {
        const adjacentNumbers = [];
        searchCoordinates.forEach(([searchX, searchY]) => {
            const lineIndex = symbolX + searchX;
            const charIndex = symbolY + searchY;
            if (
                lineIndex < 0 ||
                lineIndex > lines.length - 1 ||
                charIndex < 0 ||
                charIndex > numberOfChars - 1
            ) {
            } else {
                const chars = lines[lineIndex].split('');
                const charAt = chars[charIndex];
                if (isNumber(charAt)) {
                    adjacentNumbers.push(findNumber(chars, charIndex));
                }
            }
        });
        foundNumbers = [...foundNumbers, ...new Set(adjacentNumbers)];
    });

    return foundNumbers.reduce((acc, foundNumber) => {
        return (acc += +foundNumber);
    }, 0);
};

const isStar = (char: string) => /\*/.test(char);

export const calculateGearRatioGolden = () => {
    const lines = input.split(/\r?\n/);
    const symbolCoordinates = [];

    let numberOfChars = 0;
    lines.forEach((line, lineIndex) => {
        const chars = line.split('');
        numberOfChars = chars.length;
        chars.forEach((char, charIndex) => {
            if (isStar(char)) {
                symbolCoordinates.push([lineIndex, charIndex]);
            }
        });
    });

    let sum = 0;
    symbolCoordinates.forEach(([symbolX, symbolY]) => {
        const adjacentNumbers = [];
        searchCoordinates.forEach(([searchX, searchY]) => {
            const lineIndex = symbolX + searchX;
            const charIndex = symbolY + searchY;
            if (
                lineIndex < 0 ||
                lineIndex > lines.length - 1 ||
                charIndex < 0 ||
                charIndex > numberOfChars - 1
            ) {
            } else {
                const chars = lines[lineIndex].split('');
                const charAt = chars[charIndex];
                if (isNumber(charAt)) {
                    adjacentNumbers.push(findNumber(chars, charIndex));
                }
            }
        });
        const adjacentNumbersWithoutDuplicates = [...new Set(adjacentNumbers)];
        if (adjacentNumbersWithoutDuplicates.length === 2) {
            sum +=
                adjacentNumbersWithoutDuplicates[0] *
                adjacentNumbersWithoutDuplicates[1];
        }
    });
    return sum;
};
