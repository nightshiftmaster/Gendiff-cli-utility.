import parseByType from './parsers.js';
import buildDiff from './build-difference.js';
import selectFormat from './formatters/index.js';

const genDiff = (file1, file2, formatName = 'stylish') => {
  const currFormat = selectFormat(formatName);
  return currFormat(buildDiff(parseByType(file1), parseByType(file2)));
};

export default genDiff;
