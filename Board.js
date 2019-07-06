const createEmptyArray = (size) => {
    if (size < 0) {
        throw new RangeError('Array size must be greater than 0');
    }

    const board = [];

    for (let i = 0; i < Math.pow(size, 2); i += 1) {
        const temp = [];

        for (let j = 0; j < Math.pow(size, 2); j += 1) {
            temp.push(0);
        }

        board.push(temp);
    }

    return board;
};

class Board {
    constructor(size) {
        const s = size == null ? 3 : size;
        return createEmptyArray(s);
    }
}

module.exports = Board;
