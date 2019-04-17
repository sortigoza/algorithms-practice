/* eslint-env mocha */
const assert = require('assert');


class Solution {
  find(items, k) {
    this.k = k;

    const candidateList = [items];
    const result = this._evaluate(candidateList);
    if (result === this.k) return [true, { result, candidateList }];

    return this._recurse(items);
  }

  _recurse(items, i = 1, tail = []) {
    const firstPart = items.slice(0, i);
    const secondPart = items.slice(i);

    const candidateList = [firstPart, secondPart, ...tail];
    const result = this._evaluate(candidateList);
    if (result === this.k) return [true, { result, candidateList }];

    if (secondPart.length <= 1) {
      if (firstPart.length <= 1) return [false, {}];
      return this._recurse(firstPart, 1, [secondPart, ...tail]);
    }
    return this._recurse(items, i + 1, tail);
  }

  _evaluate(candidate) {
    return candidate
      .map(item => parseInt(item.join(''), 10))
      .reduce((sum, element) => sum + element);
  }
}


const testItems = [1, 2, 3, 4];
const solution = new Solution();

it('find k', () => {
  assert.equal(solution.find(testItems, 1234)[0], true);
  assert.equal(solution.find(testItems, 10)[0], true);
  assert.equal(solution.find(testItems, 19)[0], true);
  assert.equal(solution.find(testItems, 46)[0], true);
});

it('does not find k', () => {
  assert.equal(solution.find(testItems, 460)[0], false);
});

it('evaluates correctly', () => {
  assert.equal(solution._evaluate([[12], [34]]), 46);
});
