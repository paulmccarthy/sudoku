/* eslint-disable prefer-arrow-callback */

const expect = require('chai').expect;

const Board = require('../Board');

const checkBoard = (board, size) => {
    expect(board).to.be.an('array');
    expect(board).to.have.lengthOf(size * size);

    board.forEach((line) => {
        expect(line).to.be.an('array');
        expect(line).to.have.lengthOf(size * size);
    });
};

describe('Unit tests for Board.js', function () {
    it('should return an array of the correct size', function () {
        for (let i = 0; i < 10; i += 1) {
            const board = new Board(i);
            checkBoard(board, i);
        }
    });

    it('should throw an error if a negative size is provide', function () {
        expect(() => new Board(-1)).to.throw();
    });

    it('should create a board with a default size of 9 x 9', function () {
        const board = new Board();
        checkBoard(board, 3);
    });
});
