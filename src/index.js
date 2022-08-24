import path from 'path';
import { readFileSync } from 'fs';
import parseByType from './parsers.js';
import buildDiff from './build-difference.js';
import selectFormat from './formatters/index.js';

const getFilePath = (filePath) => path.resolve(process.cwd(), '.', filePath);

const readFile = (filename) => readFileSync(getFilePath(filename), 'utf-8');

const parseFile = (file) => {
  const type = path.extname(file).slice(1);
  const data = readFile(file);
  const parser = parseByType(type);
  return parser(data);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);
  const currFormat = selectFormat(formatName);
  return currFormat(buildDiff(file1, file2));
};

export default genDiff;
