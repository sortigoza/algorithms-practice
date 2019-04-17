#!mocha cidr_convert.js
// to fix lint: eslint --fix cidr_convert.js
/* eslint-env mocha */

const assert = require('assert');


class Ipv4Validator {
  validate(ipv4) {
    const octets = ipv4.split('.');
    if (octets.length !== 4) {
      return false;
    }
    if (!this._areNumbers(octets)) {
      return false;
    }
    if (this._haveInvalidRange(octets)) {
      return false;
    }
    return true;
  }

  _areNumbers(octets) {
    for (let i = 0; i < octets.length; i += 1) {
      if (/^-?\d+$/.test(octets[i])) {
        return true;
      }
    }
    return false;
  }

  _haveInvalidRange(octets) {
    const intOctets = octets.map(octet => parseInt(octet, 10));
    for (let i = 0; i < intOctets.length; i += 1) {
      if (intOctets[i] < 0 || intOctets[i] > 255) {
        return true;
      }
    }
    return false;
  }
}


class CidrMask {
  constructor() {
    this.INVALID = 'Invalid';
  }

  maskToCidr(mask) {
    const octets = mask.split('.');
    if (octets.length !== 4) return this.INVALID;
    const binaryNumber = octets.map(octet => parseInt(octet, 10).toString(2)).join('');
    if (!/^1+0+$/.test(binaryNumber)) return this.INVALID;
    return this._countOccurences(binaryNumber, '1');
  }

  cidrToMask(cidr) {
    const MAX_NUMBER_OF_BITS = 32;
    if (cidr <= 0 || cidr > MAX_NUMBER_OF_BITS) return this.INVALID;
    const ones = '1'.repeat(cidr);
    const zeros = '0'.repeat(MAX_NUMBER_OF_BITS - cidr);
    return this._chunksOf8(ones + zeros)
      .map(octet => parseInt(octet, 2))
      .join('.');
  }

  _chunksOf8(text) {
    return text.match(/.{8}/g);
  }

  // _countOccurences(mainString, characterToFind) {
  //     let expression = new RegExp(characterToFind, 'g')
  //     return (mainString.match(expression) || []).length
  // }

  _countOccurences(mainString, characterToFind) {
    let count = 0;
    for (let i = 0; i < mainString.length; i += 1) {
      if (mainString[i] === characterToFind) {
        count += 1;
      }
    }
    return count;
  }
}

const solution = new CidrMask();
const ipv4validator = new Ipv4Validator();


it('should count character occurences', () => {
  assert.equal(solution._countOccurences('000000', '1'), 0);
  assert.equal(solution._countOccurences('1000', '1'), 1);
  assert.equal(solution._countOccurences('111000', '1'), 3);
  assert.equal(solution._countOccurences('111111', '1'), 6);
});

it('should convert valid masks', () => {
  assert.equal(solution.maskToCidr('127.0.0.0'), 7);
});

it('should return invalid for invalid masks', () => {
  assert.equal(solution.maskToCidr('127.0.0'), 'Invalid');
  assert.equal(solution.maskToCidr('127.0.0.0.0'), 'Invalid');
  assert.equal(solution.maskToCidr('127.0.0.1'), 'Invalid');
});

it('should convert valid cidr', () => {
  assert.equal(solution.cidrToMask(8), '255.0.0.0');
  assert.equal(solution.cidrToMask(10), '255.192.0.0');
});

it('should return invalid for invalid cidr', () => {
  assert.equal(solution.cidrToMask(0), 'Invalid');
  assert.equal(solution.cidrToMask(-1), 'Invalid');
  assert.equal(solution.cidrToMask(33), 'Invalid');
});

it('test valid ipv4', () => {
  assert.equal(ipv4validator.validate('127.0.0.1'), true);
  assert.equal(ipv4validator.validate('0.0.0.0'), true);
  assert.equal(ipv4validator.validate('192.168.0.1'), true);
  assert.equal(ipv4validator.validate('255.255.255.255'), true);
});

it('test invalid ipv4', () => {
  assert.equal(ipv4validator.validate('192.168.1.2.3'), false);
  assert.equal(ipv4validator.validate('a.b.c.d'), false);
  assert.equal(ipv4validator.validate('255.256.250.0'), false);
  assert.equal(ipv4validator.validate('....'), false);
});
