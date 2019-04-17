/* eslint-env mocha */
const assert = require('assert');
//   | a / b / c
// 1 | 1   2   3
// 2 | 4   5   6
// 3 | 8   7   9
// 4 | 4   1   6

// for each row:
// - find lowest k
// - if lowest k is the same k as previous, find second lowest
// - store current k
// - next row

class Solution {
  constructor(costsMatrix) {
    this.costsMatrix = costsMatrix;
  }

  findSolution() {
    this._resetSolution();

    let lowestIndex = this._findCheapestIndex(this.costsMatrix[0]);
    this._addToSolution(lowestIndex[0]);

    for (let row = 1; row < this.costsMatrix.length; row += 1) {
      lowestIndex = this._findCheapestIndex(this.costsMatrix[row]);
      // if cheapest colour is the same as previous house use second cheapest
      // else use cheapest
      if (lowestIndex[0] === this.previousIndex) {
        this._addToSolution(lowestIndex[1]);
      } else {
        this._addToSolution(lowestIndex[0]);
      }
    }

    return this.solution;
  }

  _resetSolution() {
    this.previousIndex = 0;
    this.solution = [];
  }

  _addToSolution(index) {
    this.previousIndex = index;
    this.solution.push(index);
  }

  _findCheapestIndex(row) {
    // double bubble-sort
    let firstCheapIndex = 0; let
      secondCheapIndex = 1;
    for (let i = 1; i < row.length; i += 1) {
      if (row[i] <= row[firstCheapIndex]) {
        secondCheapIndex = firstCheapIndex;
        firstCheapIndex = i;
        continue; // eslint-disable-line no-continue
      }

      if (row[i] <= row[secondCheapIndex]) {
        secondCheapIndex = i;
      }
    }
    return [firstCheapIndex, secondCheapIndex];
  }
}

const nkMatrix = [
  [1, 2, 3],
  [4, 5, 6],
  [8, 7, 9],
  [4, 1, 6],
  [4, 1, 1],
];

const sol = new Solution(nkMatrix);

describe('house paint', () => {
  it('finds the two smallest numbers index', () => {
    let index = sol._findCheapestIndex([0, 1, 2, 3]);
    assert.deepEqual(index, [0, 1]);

    index = sol._findCheapestIndex([3, 2, 1, 0]);
    assert.deepEqual(index, [3, 2]);

    index = sol._findCheapestIndex([4, 1, 2, 3]);
    assert.deepEqual(index, [1, 2]);
  });

  it('finds cheapest house painting arrangement', () => {
    const solutionAnswer = sol.findSolution();
    const correctAnswer = [0, 1, 0, 1, 2];
    assert.deepEqual(solutionAnswer, correctAnswer);
  });
});
