/* eslint-disable prefer-arrow-callback */

const expect = require('chai').expect;
const Board = require('../Board');
const Sudoku = require('../Sudoku');

const simpleOpts = {
    board: new Board(2)
};

describe('Tests for Sudoku.js', function () {
    describe('#constructor', function () {
        it('should return an instance of the class', function () {
            const game = new Sudoku(simpleOpts);
            expect(game).to.be.an.instanceOf(Sudoku);
        });
    });

    describe('#checkSize', function () {
        it('should return the correct size', function () {
            const game = new Sudoku(simpleOpts);
            expect(game.size).to.be.equal(2);
        });

        it('should throw an error if the board is not square', function () {
            const opts = {};
            opts.board = [
                [1],
                [1, 2]
            ];

            expect(() => new Sudoku(opts)).to.throw();
        });
    });

    describe('#calculateSum', function () {
        it('should calculate the required sum based on the board size', function () {
            const opts = {};
            opts.board = new Board(2);

            let game = new Sudoku(opts);
            expect(game.sum).to.be.equal(10);

            opts.board = new Board(3);

            game = new Sudoku(opts);
            expect(game.sum).to.be.equal(45);

            opts.board = new Board(4);

            game = new Sudoku(opts);
            expect(game.sum).to.be.equal(136);
        });
    });

    describe('#fillRow', function () {
        it('should fill a row with one missing number', function () {
            const opts = {};
            opts.board = new Board(3);
            const expectedResult = [1, 2, 3, 4, 5, 6, 7, 8, 9];

            for (let i = 0; i < 9; i += 1) {
                opts.board[i] = [0, 2, 3, 4, 5, 6, 7, 8, 9];

                const game = new Sudoku(opts);
                game.fillRow(i);

                expect(game.board[i]).to.deep.equal(expectedResult);
            }
        });

        it('should return the original line if there is more than one missing number', function () {
            const opts = {};
            opts.board = new Board(3);
            const expectedResult = [0, 0, 3, 4, 5, 6, 7, 8, 9];

            for (let i = 0; i < 9; i += 1) {
                opts.board[i] = expectedResult;

                const game = new Sudoku(opts);
                game.fillRow(i);
                expect(game.board[i]).to.deep.equal(expectedResult);
            }
        });
    });

    describe('#transposeBoard', function () {
        it('should transpose the board correctly', function () {
            const opts = {};
            opts.board = [
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 15, 16]
            ];
            const expectedResult = [
                [1, 5, 9, 13],
                [2, 6, 10, 14],
                [3, 7, 11, 15],
                [4, 8, 12, 16]
            ];

            const game = new Sudoku(opts);
            game.transposeBoard();

            expect(game.board).to.deep.equal(expectedResult);
        });

        it('should return the same board of transposed an even number of times', function () {
            const opts = {};
            opts.board = [
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 15, 16]
            ];
            const expectedResult = [
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 15, 16]
            ];

            const game = new Sudoku(opts);
            game.transposeBoard();
            game.transposeBoard();
            game.transposeBoard();
            game.transposeBoard();

            expect(game.board).to.deep.equal(expectedResult);
        });
    });

    describe('#fillBlock', function () {
        it('should fill Block 0 correctly when there is one missing number (9 x 9)', function () {
            const opts = {};
            opts.board = [
                [0, 1, 2, 0, 1, 2, 0, 1, 2],
                [3, 4, 5, 3, 4, 5, 3, 4, 5],
                [6, 7, 8, 6, 7, 8, 6, 7, 8],
                [0, 1, 2, 0, 1, 2, 0, 1, 2],
                [3, 4, 5, 3, 4, 5, 3, 4, 5],
                [6, 7, 8, 6, 7, 8, 6, 7, 8],
                [0, 1, 2, 0, 1, 2, 0, 1, 2],
                [3, 4, 5, 3, 4, 5, 3, 4, 5],
                [6, 7, 8, 6, 7, 8, 6, 7, 8]
            ];
            const expectedResult = [
                [9, 1, 2, 0, 1, 2, 0, 1, 2],
                [3, 4, 5, 3, 4, 5, 3, 4, 5],
                [6, 7, 8, 6, 7, 8, 6, 7, 8],
                [0, 1, 2, 0, 1, 2, 0, 1, 2],
                [3, 4, 5, 3, 4, 5, 3, 4, 5],
                [6, 7, 8, 6, 7, 8, 6, 7, 8],
                [0, 1, 2, 0, 1, 2, 0, 1, 2],
                [3, 4, 5, 3, 4, 5, 3, 4, 5],
                [6, 7, 8, 6, 7, 8, 6, 7, 8]
            ];

            const game = new Sudoku(opts);
            game.fillBlock(0);
            expect(game.board).to.deep.equal(expectedResult);
        });

        it('should fill Block 1 correctly when there is one missing number (16 x 16)', function () {
            const opts = {};
            opts.board = [
                /* eslint-disable array-bracket-spacing */
                /* eslint-disable no-multi-spaces */
                [ 0,  1,  2,  3,  0,  1,  2,  3,  0,  1,  2,  3,  0,  1,  2,  3],
                [ 4,  5,  6,  7,  4,  5,  6,  7,  4,  5,  6,  7,  4,  5,  6,  7],
                [ 8,  9, 10, 11,  8,  9, 10, 11,  8,  9, 10, 11,  8,  9, 10, 11],
                [12, 13, 14, 15, 12, 13, 14, 15, 12, 13, 14, 15, 12, 13, 14, 15],
                [ 0,  1,  2,  3,  0,  1,  2,  3,  0,  1,  2,  3,  0,  1,  2,  3],
                [ 4,  5,  6,  7,  4,  5,  6,  7,  4,  5,  6,  7,  4,  5,  6,  7],
                [ 8,  9, 10, 11,  8,  9, 10, 11,  8,  9, 10, 11,  8,  9, 10, 11],
                [12, 13, 14, 15, 12, 13, 14, 15, 12, 13, 14, 15, 12, 13, 14, 15],
                [ 0,  1,  2,  3,  0,  1,  2,  3,  0,  1,  2,  3,  0,  1,  2,  3],
                [ 4,  5,  6,  7,  4,  5,  6,  7,  4,  5,  6,  7,  4,  5,  6,  7],
                [ 8,  9, 10, 11,  8,  9, 10, 11,  8,  9, 10, 11,  8,  9, 10, 11],
                [12, 13, 14, 15, 12, 13, 14, 15, 12, 13, 14, 15, 12, 13, 14, 15],
                [ 0,  1,  2,  3,  0,  1,  2,  3,  0,  1,  2,  3,  0,  1,  2,  3],
                [ 4,  5,  6,  7,  4,  5,  6,  7,  4,  5,  6,  7,  4,  5,  6,  7],
                [ 8,  9, 10, 11,  8,  9, 10, 11,  8,  9, 10, 11,  8,  9, 10, 11],
                [12, 13, 14, 15, 12, 13, 14, 15, 12, 13, 14, 15, 12, 13, 14, 15]
                /* eslint-enable no-multi-spaces */
                /* eslint-enable array-bracket-spacing */
            ];
            const expectedResult = [
                /* eslint-disable array-bracket-spacing */
                /* eslint-disable no-multi-spaces */
                [ 0,  1,  2,  3, 16,  1,  2,  3,  0,  1,  2,  3,  0,  1,  2,  3],
                [ 4,  5,  6,  7,  4,  5,  6,  7,  4,  5,  6,  7,  4,  5,  6,  7],
                [ 8,  9, 10, 11,  8,  9, 10, 11,  8,  9, 10, 11,  8,  9, 10, 11],
                [12, 13, 14, 15, 12, 13, 14, 15, 12, 13, 14, 15, 12, 13, 14, 15],
                [ 0,  1,  2,  3,  0,  1,  2,  3,  0,  1,  2,  3,  0,  1,  2,  3],
                [ 4,  5,  6,  7,  4,  5,  6,  7,  4,  5,  6,  7,  4,  5,  6,  7],
                [ 8,  9, 10, 11,  8,  9, 10, 11,  8,  9, 10, 11,  8,  9, 10, 11],
                [12, 13, 14, 15, 12, 13, 14, 15, 12, 13, 14, 15, 12, 13, 14, 15],
                [ 0,  1,  2,  3,  0,  1,  2,  3,  0,  1,  2,  3,  0,  1,  2,  3],
                [ 4,  5,  6,  7,  4,  5,  6,  7,  4,  5,  6,  7,  4,  5,  6,  7],
                [ 8,  9, 10, 11,  8,  9, 10, 11,  8,  9, 10, 11,  8,  9, 10, 11],
                [12, 13, 14, 15, 12, 13, 14, 15, 12, 13, 14, 15, 12, 13, 14, 15],
                [ 0,  1,  2,  3,  0,  1,  2,  3,  0,  1,  2,  3,  0,  1,  2,  3],
                [ 4,  5,  6,  7,  4,  5,  6,  7,  4,  5,  6,  7,  4,  5,  6,  7],
                [ 8,  9, 10, 11,  8,  9, 10, 11,  8,  9, 10, 11,  8,  9, 10, 11],
                [12, 13, 14, 15, 12, 13, 14, 15, 12, 13, 14, 15, 12, 13, 14, 15]
                /* eslint-enable no-multi-spaces */
                /* eslint-enable array-bracket-spacing */
            ];

            const game = new Sudoku(opts);
            game.fillBlock(1);
            expect(game.board).to.deep.equal(expectedResult);
        });

        it('should return the original board if there is more than one missing number', function () {
            const opts = {};
            opts.board = [
                [0, 0, 2, 0, 0, 0, 0, 0, 0],
                [3, 4, 5, 0, 0, 0, 0, 0, 0],
                [6, 7, 8, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ];
            const expectedResult = [
                [0, 0, 2, 0, 0, 0, 0, 0, 0],
                [3, 4, 5, 0, 0, 0, 0, 0, 0],
                [6, 7, 8, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ];

            const game = new Sudoku(opts);
            game.fillBlock(0);
            expect(game.board).to.deep.equal(expectedResult);
        });
    });
});
