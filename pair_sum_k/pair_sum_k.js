/* eslint-env mocha */
const assert = require('assert');


class Solution {
  find(lis, k) {
    this.lis = lis;
    this.k = k;

    const { veredict } = this._findCombinations();
    return veredict;
  }

  _findCombinations() {
    const n = this.lis.length;
    for (let i = 0; i < n; i += 1) {
      for (let j = i + 1; j < n; j += 1) {
        const res = this._evaluateIndexSum(i, j);
        if (res.veredict) {
          // console.log({...res, i, j})
          return res;
        }
      }
    }
    return { veredict: false };
  }

  _evaluateIndexSum(a, b) {
    const result = this.lis[a] + this.lis[b];
    return { result, veredict: result === this.k };
  }
}

const solution = new Solution();

describe('pair sum match k', () => {
  it('finds valid pair', () => {
    const testList = [1, 2, 3, 5];

    assert.equal(solution.find(testList, 3), true); // 1 + 2
    assert.equal(solution.find(testList, 5), true); // 2 + 3
    assert.equal(solution.find(testList, 6), true); // 1 + 5
  });

  it('finds does not find valid pair', () => {
    const testList = [1, 2, 3, 5];

    assert.equal(solution.find(testList, 30), false);
  });
});
