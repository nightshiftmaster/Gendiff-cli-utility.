import {
  describe, it, expect,
} from '@jest/globals';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../lib/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const makeDiff = gendiff;

const flatJson1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const flatJson2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

describe('genDiff', () => {
  it('empty data', () => {
    const expected = ['{', '}'].join('\n');

    expect(makeDiff({}, {})).toEqual(expected);
  });

  it('flat json', () => {
    const expected = readFile('flat.txt');

    expect(makeDiff(flatJson1, flatJson2)).toEqual(expected);
  });
});
