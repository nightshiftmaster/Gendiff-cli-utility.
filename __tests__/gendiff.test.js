import {
  describe, it, expect,
} from '@jest/globals';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';
import { parseYml, parseJson } from '../src/parsers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const flatJson1 = parseJson('file1.json');
const flatJson2 = parseJson('file2.json');
const flatYml1 = parseYml('file1.yml');
const flatYml2 = parseYml('file2.yml');

describe('genDiff', () => {
  it('empty data', () => {
    const expected = ['{', '}'].join('\n');

    expect(gendiff({}, {})).toEqual(expected);
  });

  it('flat json', () => {
    const expected = readFile('flat.txt');

    expect(gendiff(flatJson1, flatJson2)).toEqual(expected);
  });

  it('flat yml', () => {
    const expected = readFile('flat.txt');

    expect(gendiff(flatYml1, flatYml2)).toEqual(expected);
  });

  it('json vs yml', () => {
    const expected = readFile('flat.txt');

    expect(gendiff(flatJson1, flatYml2)).toEqual(expected);
  });
});
