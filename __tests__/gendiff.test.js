import {
  describe, it, expect,
} from '@jest/globals';
import gendiff from '../lib/index';

const makeDiff = gendiff;

describe('genDiff', () => {
  it('test 1', () => {
    const expexted = ['{', '}'].join('\n');

    expect(makeDiff({}, {})).toEqual(expexted);
  });
});
