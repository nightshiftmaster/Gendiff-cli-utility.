import path from 'path';
import { readFileSync } from 'fs';
import parseByType from './parsers.js';
import buildDiff from './build-difference.js';
import selectFormat from './formatters/index.js';

const readFile = (fileName) => readFileSync(path.resolve(process.cwd(), '.', fileName), 'utf-8');

const parseFile = (file) => {
  const type = path.extname(file).slice(1);
  const data = readFile(file);
  const parser = parseByType(type);
  return parser(data);
};

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const file1 = parseFile(filePath1);
  const file2 = parseFile(filePath2);
  const currentFormat = selectFormat(formatName);
  return currentFormat(buildDiff(file1, file2));
};

export default genDiff;
