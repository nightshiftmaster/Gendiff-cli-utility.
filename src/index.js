import { readFileSync } from 'fs';
import path from 'path';
import parseByType from './parsers.js';
import buildDiff from './build-difference.js';
import selectFormat from './formatters/index.js';

const getFilePath = (filePath) => path.resolve(process.cwd(), '.', filePath);

const readFile = (filename) => readFileSync(getFilePath(filename), 'utf-8');

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const currFormat = selectFormat(formatName);
  return currFormat(buildDiff(parseByType(file1), parseByType(file2)));
};

export default genDiff;
