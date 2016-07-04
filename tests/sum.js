const { describe, it } = global;
import { expect } from 'chai';
import { sum } from '../src';

/* eslint-disable no-magic-numbers */

describe('sum', () => {
  it('should sum 0 numbers', () =>
    expect(sum()).to.equal(0)
  );
  it('should sum 1 number', () =>
    expect(sum(42)).to.equal(42)
  );
  it('should sum 2 numbers', () =>
    expect(sum(20, 22)).to.equal(42)
  );
  it('should sum 3 numbers', () =>
    expect(sum(10, 15, 17)).to.equal(42)
  );
  it('should sum 1000 numbers', () => {
    const args = [];
    const limit = 1000;
    for(let k = 0; k < limit; k = k + 1) {
      args[k] = k;
    }
    expect(sum(...args)).to.equal(limit * (limit - 1) / 2);
  });
});
