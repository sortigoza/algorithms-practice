/* eslint-env mocha */
const assert = require('assert');

class Solution {
  constructor(board) {
    this.board = board;
    this.boardSize = board.length;
  }

  isSafe(row, col) {
    return this._isSafeOnTheUpColumn(row, col)
          && this._isSafeOnDownDiagonal(row, col)
          && this._isSafeOnUpDiagonal(row, col);
  }

  _isSafeOnTheUpColumn(row, col) {
    for (let j = row; j >= 0; j -= 1) {
      if (this.board[j][col] === 1) {
        return false;
      }
    }
    return true;
  }

  _isSafeOnDownDiagonal(row, col) {
    let i = row; let
      j = col;
    while (i >= 0 && j >= 0) {
      if (this.board[i][j] === 1) {
        return false;
      }
      i -= 1;
      j -= 1;
    }
    return true;
  }

  _isSafeOnUpDiagonal(row, col) {
    let i = row; let
      j = col;
    while (i >= 0 && j < this.boardSize) {
      if (this.board[i][j] === 1) {
        return false;
      }
      i -= 1;
      j += 1;
    }
    return true;
  }

  nQeens(totalQeens, row = 0) {
    if (row >= totalQeens) {
      return true;
    }

    for (let col = 0; col < this.boardSize; col += 1) {
      if (this.isSafe(row, col)) {
        this.board[row][col] = 1;
        if (this.nQeens(totalQeens, row + 1)) {
          return true;
        }
        this.board[row][col] = 0;
      }
    }

    return false;
  }
}

it('tests is safe function', () => {
  const board3x3 = [
    [1, 0, 1],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const sol = new Solution(board3x3);
  assert.equal(
    sol._isSafeOnTheUpColumn(1, 0),
    false,
  );
  assert.equal(
    sol._isSafeOnTheUpColumn(1, 1),
    true,
  );

  assert.equal(
    sol._isSafeOnDownDiagonal(1, 1),
    false,
  );
  assert.equal(
    sol._isSafeOnDownDiagonal(1, 2),
    true,
  );

  assert.equal(
    sol._isSafeOnUpDiagonal(1, 1),
    false,
  );
  assert.equal(
    sol._isSafeOnUpDiagonal(1, 0),
    true,
  );
});

it('tests n qeens for 3 by 3 board', () => {
  const board3x3 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const solution = new Solution(board3x3);
  assert.equal(
    solution.nQeens(2),
    true,
  );
  console.log(solution.board);
  assert.equal(
    solution.nQeens(2),
    false,
  );
});

it('tests n qeens for 4 by 4 board', () => {
  const board4x4 = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const solution = new Solution(board4x4);
  assert.equal(
    solution.nQeens(4),
    true,
  );
  console.log(solution.board);
});
