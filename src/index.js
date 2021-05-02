import parseByType from './parsers.js';
import buildDiff from './build-difference.js';
import selectFormat from './formatters/index.js';

const genDiff = (file1, file2, formatName = 'stylish') => {
  const parsedFile1 = parseByType(file1);
  const parsedFile2 = parseByType(file2);
  const currFormat = selectFormat(formatName);
  return currFormat(buildDiff(parsedFile1, parsedFile2));
};

export default genDiff;
