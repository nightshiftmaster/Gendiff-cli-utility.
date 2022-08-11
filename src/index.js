/* eslint default-param-last: ["error"] */
import { readFileSync } from 'fs';
import path from 'path';
import parseByType from './parsers.js';
import buildDiff from './build-difference.js';
import selectFormat from './formatters/index.js';

const getFilePath = (filePath) => path.resolve(process.cwd(), '.', filePath);

const readFile = (filename) => readFileSync(getFilePath(filename), 'utf-8');

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = parseByType(filepath1, readFile);
  const file2 = parseByType(filepath2, readFile);
  const currFormat = selectFormat(formatName);
  return currFormat(buildDiff(file1, file2));
};

export default genDiff;
