import path from 'path';
import { readFileSync } from 'fs';
import getParserByType from './parsers.js';
import buildDiff from './build-difference.js';
import selectFormat from './formatters/index.js';

const readFile = (fileName) => readFileSync(path.resolve(process.cwd(), '.', fileName), 'utf-8');

const parseFile = (filePath) => {
  const type = path.extname(filePath).slice(1);
  const data = readFile(filePath);
  const parser = getParserByType(type);
  return parser(data);
};

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const object1 = parseFile(filePath1);
  const object2 = parseFile(filePath2);
  const formatter = selectFormat(formatName);
  return formatter(buildDiff(object1, object2));
};

export default genDiff;
