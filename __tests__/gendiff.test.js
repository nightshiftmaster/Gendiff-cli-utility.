import {
  describe, expect, test,
} from '@jest/globals';
import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const stylishResult = readFileSync(path.join(process.cwd(), '__fixtures__', 'stylish.txt'), 'utf-8');
const plainResult = readFileSync(path.join(process.cwd(), '__fixtures__', 'plain.txt'), 'utf-8');
const jsonResult = readFileSync(path.join(process.cwd(), '__fixtures__', 'json.txt'), 'utf-8');

const extensions = ['json', 'yml'];

describe('get difference of two files', () => {
  test.each(extensions)('files format', (extention) => {
    const filePath1 = `${process.cwd()}/__fixtures__/before.${extention}`;
    const filePath2 = `${process.cwd()}/__fixtures__/after.${extention}`;
    expect(genDiff(filePath1, filePath2)).toEqual(stylishResult);
    expect(genDiff(filePath1, filePath2, 'stylish')).toEqual(stylishResult);
    expect(genDiff(filePath1, filePath2, 'plain')).toEqual(plainResult);
    expect(genDiff(filePath1, filePath2, 'json')).toEqual(jsonResult);
  });
});
