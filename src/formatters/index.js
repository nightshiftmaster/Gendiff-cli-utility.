import buildDiff from '../index.js';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';
import { parseByType } from '../parsers.js';

const formatters = [plain, stylish, json];

const genDiff = (file1, file2, formatter = 'stylish') => {
  const index = formatters.map((n) => n.name).indexOf(formatter);
  const currFormat = formatters[index];
  return currFormat(buildDiff(parseByType(file1), parseByType(file2)));
};

export default genDiff;
