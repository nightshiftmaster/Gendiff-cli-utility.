import {
  describe, it, expect,
} from '@jest/globals';
import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import { fileURLToPath } from 'url';
import buildDiff from '../src/builddiff.js';
import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const json1 = JSON.parse(readFile('file1.json'));
const json2 = JSON.parse(readFile('file2.json'));
const yml1 = yaml.load(readFile('file1.yml'));
const yml2 = yaml.load(readFile('file2.yml'));

describe('genDiff', () => {
  it('empty data', () => {
    const expected = ['{', '}'].join('\n');

    expect(stylish(buildDiff({}, {}))).toEqual(expected);
  });

  it('nested json', () => {
    const expected = readFile('stylish.txt');
    expect(stylish(buildDiff(json1, json2))).toEqual(expected);
  });
  it('nested yml', () => {
    const expected = readFile('stylish.txt');
    expect(stylish(buildDiff(yml1, yml2))).toEqual(expected);
  });
  it('plain json', () => {
    const expected = readFile('plain.txt');
    expect(plain(buildDiff(json1, json2))).toEqual(expected);
  });
});
