import { input, inputTest } from './2.data';

const isNumberOfCubesPossible = (givenCubes: number, pulledCubes: number) => {
    return pulledCubes <= givenCubes;
};

export const calculateGameIdsSum = (
    red: number,
    green: number,
    blue: number
) => {
    const games = input
        .replaceAll(/Game ([1-9][0-9]{0,1}|100): /g, '')
        .split(/\r?\n/);

    const gameIds = [];
    games.forEach((game, index) => {
        const sets = game.trim().split(/;/g);
        let isPossible = true;
        setLoop: for (let i = 0; i < sets.length; i++) {
            const set = sets[i];
            const cubes = set.trim().split(/,/g);
            cubeLoop: for (let j = 0; j < cubes.length; j++) {
                const [numberOfCubes, color] = cubes[j].trim().split(/ /);
                if (color === 'red') {
                    isPossible = isNumberOfCubesPossible(red, +numberOfCubes);
                } else if (color === 'green') {
                    isPossible = isNumberOfCubesPossible(green, +numberOfCubes);
                } else if (color === 'blue') {
                    isPossible = isNumberOfCubesPossible(blue, +numberOfCubes);
                }
                if (!isPossible) {
                    break setLoop;
                }
            }
        }
        if (isPossible) {
            gameIds.push(index + 1);
        }
    });
    return gameIds.reduce((acc, item) => {
        return acc + item;
    }, 0);
};

const getMinimumNumberOfCubes = (cubes: number[]): number => {
    return Math.max(...cubes);
};

export const calculateNumbersOfFewestCubes = () => {
    const games = input
        .replaceAll(/Game ([1-9][0-9]{0,1}|100): /g, '')
        .split(/\r?\n/);

    const minimumNumberOfCubes = [];
    games.forEach((game) => {
        const sets = game.trim().split(/;/g);
        const redCubes = [];
        const greenCubes = [];
        const blueCubes = [];
        sets.forEach((set) => {
            const pull = set.trim().split(/,/g);
            pull.forEach((cubes) => {
                const [numberOfCubes, color] = cubes.trim().split(/ /);
                if (color === 'red') {
                    redCubes.push(numberOfCubes);
                } else if (color === 'green') {
                    greenCubes.push(numberOfCubes);
                } else if (color === 'blue') {
                    blueCubes.push(numberOfCubes);
                }
            });
        });

        const minimums = [
            getMinimumNumberOfCubes(redCubes),
            getMinimumNumberOfCubes(greenCubes),
            getMinimumNumberOfCubes(blueCubes),
        ];
        minimumNumberOfCubes.push(minimums);
    });

    return minimumNumberOfCubes.reduce((acc, minimums) => {
        const power = minimums.reduce((sum, minimum) => {
            return sum * minimum;
        }, 1);
        return acc + power;
    }, 0);
};
