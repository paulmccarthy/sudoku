const Board = require('./Board');

class Sudoku {
    constructor(options) {
        this.board = options.board;
        this.size = this.checkSize(options.board);
        this.sum = this.calculateSum(this.size);
    }

    /**
     * Checks the size of the board and ensures that the board is square
     * @returns {Number} The size of the board
     * @throws {Error}
     */
    checkSize(board) {
        let size = Math.sqrt(board.length);

        if (!Number.isInteger(size)) {
            throw new Error('BoardError: Invalid board size. Board must be square.')
        }

        for (let i = 0; i < board.length; i += 1) {
            const line = board[i];

            if (line.length != board.length) {
                throw new Error('BoardError: Board is not square.');
            }
        }

        return size;
    }

    /**
     * Calculates the sum of 1 to n
     * @returns {Number}
     */
    calculateSum(size) {
        const n = size * size;
        return (n * (n + 1)) / 2;
    }

    /**
     * Checks if a line has a single missing number, and completes the line if so.
     * @param {Number} offset The board index of the line
     * @returns {Array}
     */
    fillRow(offset) {
        const row = this.board[offset];
        let missingCount = row.filter(el => el === 0).length;

        if (missingCount === 1) {
            const index = row.indexOf(0);
            const sum = row.reduce((acc, val) => acc + val);
            row[index] = this.sum - sum;
            this.board[offset] = row;
        }

        return this.board;
    }

    /**
     * Transposes the board, so that the nth row becomes the nth column
     * @returns {Array} Returns the full board
     */
    transposeBoard() {
        const temp = new Board(this.size);
        const board = this.board.slice(0);

        for (let rowIndex = 0; rowIndex < board.length; rowIndex += 1) {
            for (let columnIndex = 0; columnIndex < board[rowIndex].length; columnIndex += 1) {
                temp[columnIndex][rowIndex] = board[rowIndex][columnIndex];
            }
        }

        this.board = temp;

        return this.board;
    }

    /**
     * Checks if a mini-block has a single missing number, and completes it if so
     * @param {Number} offset The index of the block. Blocks are zero indexed from left to right, top to bottom
     * @returns {Array} Returns the full board
     */
    fillBlock(offset) {
        const board = this.board.slice(0);
        const blockSize = this.size;
        const startRow = Math.floor(offset / blockSize) * blockSize;
        const startColumn = (offset % blockSize) * blockSize;
        const endRow = startRow + (blockSize - 1);
        const endColumn = startColumn + (blockSize - 1);
        const temp = [];

        for (let rowIndex = startRow; rowIndex <= endRow; rowIndex += 1) {
            for (let colIndex = startColumn; colIndex <= endColumn; colIndex += 1) {
                temp.push(board[rowIndex][colIndex]);
            }
        }

        let missingCount = temp.filter(el => el === 0).length;

        if (missingCount === 1) {
            const index = temp.indexOf(0);
            const sum = temp.reduce((acc, val) => acc + val);
            temp[index] = this.sum - sum;

            // reverse the array so that we can pop, instead of shifting the first element
            // see https://jsperf.com/testing-array-shift-vs-array-reverse-and-array-pop
            temp.reverse();

            for (let rowIndex = startRow; rowIndex <= endRow; rowIndex += 1) {
                for (let colIndex = startColumn; colIndex <= endColumn; colIndex += 1) {
                    board[rowIndex][colIndex] = temp.pop();
                }
            }

            this.board = board;

            return this.board;
        }
    }
}

module.exports = Sudoku;
