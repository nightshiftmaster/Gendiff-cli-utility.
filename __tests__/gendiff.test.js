import {
  describe, it, expect,
} from '@jest/globals';
import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import buildDiff from '../src/build-difference.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import json from '../src/formatters/json.js';

const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const json1 = JSON.parse(readFile('file1.json'));
const json2 = JSON.parse(readFile('file2.json'));
const yml1 = yaml.load(readFile('file1.yml'));
const yml2 = yaml.load(readFile('file2.yml'));

describe('formaters tests', () => {
  it('empty data', () => {
    const expected = ['{', '}'].join('\n');
    expect(stylish(buildDiff({}, {}))).toEqual(expected);
  });

  it('nested json', () => {
    const expectedStylish = readFile('stylish.txt');
    expect(stylish(buildDiff(json1, json2))).toEqual(expectedStylish);
  });
  it('nested yml', () => {
    const expectedStylish2 = readFile('stylish.txt');
    expect(stylish(buildDiff(yml1, yml2))).toEqual(expectedStylish2);
  });
  it('plain json', () => {
    const expectedPlain = readFile('plain.txt');
    expect(plain(buildDiff(json1, json2))).toEqual(expectedPlain);
  });
  it('plain yml', () => {
    const expectedYml = readFile('plain.txt');
    expect(plain(buildDiff(yml1, yml2))).toEqual(expectedYml);
  });
  it('json output', () => {
    const expectedJson = JSON.stringify(buildDiff(json1, json2));
    expect(json(buildDiff(json1, json2))).toEqual(expectedJson);
  });
});
