import { input, inputTest } from './4.data';

// 1
// 1 + 1 = 2
// 2 + 2 = 4
// 4 + 4 = 8
// 8 + 8 = 16
export const winningScratchcards = () => {
    const cardRegEx = new RegExp(/(Card [0-9]+)/g);
    const games = input.replace(cardRegEx, '').split(/\r?\n/g);

    const wins = games.map((game) => {
        const numbers = game.trim().split('|');
        const pulled = numbers[0].trim().match(/\S+/g);
        const winning = numbers[1].trim().match(/\S+/g);
        return pulled.filter((pull) => {
            return winning.includes(pull);
        });
    });
    return wins.reduce((acc, arr) => {
        if (arr.length > 0) {
            const sum = arr.reduce((sum) => {
                if (sum === 0) {
                    return 1;
                }
                return sum + sum;
            }, 0);
            acc += sum;
        }
        return acc;
    }, 0);
};

export const winningScratchcardsGolden = (): number => {
    const cardRegEx = /(Card [0-9]+)/g;
    const games = input.replace(cardRegEx, '').split(/\r?\n/g);

    const wins = games.map((game) => {
        const [pulled, winning] = game.trim().split('|').map((numbers) => numbers.trim().split(/\s+/g));
        return pulled.filter((pull) => winning.includes(pull));
    });

    const cardsMap: Record<number, number> = wins.reduce((acc, winningNumbers, index) => {
        const copyIndices = winningNumbers.map((_, i) => i + index + 2);
        acc[index + 1] = (acc[index + 1] || 0) + 1;

        for (let i = 0; i < acc[index + 1]; i++) {
            copyIndices.forEach((copyIndex) => {
                acc[copyIndex] = (acc[copyIndex] || 0) + 1;
            });
        }

        return acc;
    }, {});

    return Object.values(cardsMap).reduce((acc, value) => acc + value, 0);
};

const sum = {
    1: {
        2: {
            3: {
                4: {
                    5: {},
                },
                5: {},
            },
            4: {
                5: {},
            },
        },
        3: {
            4: {
                5: {},
            },
            5: {},
        },
        4: {
            5: {},
        },
        5: {},
    },
    2: {
        3: {
            4: {
                5: {},
            },
            5: {},
        },
        4: {
            5: {},
        },
    },
    3: {
        4: {
            5: {},
        },
        5: {},
    },
    4: {
        5: {},
    },
    5: {},
    6: {},
};
