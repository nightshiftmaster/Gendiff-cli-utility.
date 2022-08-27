import {
  describe, expect, beforeAll, test,
} from '@jest/globals';
import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

let stylishResult;
let plainResult;
let jsonResult;

beforeAll(() => {
  stylishResult = readFileSync(path.join(process.cwd(), '__fixtures__', 'stylish.txt'), 'utf-8');
  plainResult = readFileSync(path.join(process.cwd(), '__fixtures__', 'plain.txt'), 'utf-8');
  jsonResult = readFileSync(path.join(process.cwd(), '__fixtures__', 'json.txt'), 'utf-8');
});

const extensions = ['json', 'yml'];

describe('get difference of two files', () => {
  test.each(extensions)('files format', (extention) => {
    const file1 = `${process.cwd()}/__fixtures__/before.${extention}`;
    const file2 = `${process.cwd()}/__fixtures__/after.${extention}`;
    expect(genDiff(file1, file2, 'stylish')).toEqual(stylishResult);
    expect(genDiff(file1, file2, 'plain')).toEqual(plainResult);
    expect(genDiff(file1, file2, 'json')).toEqual(jsonResult);
  });
});
