import parseByType from './parsers.js';
import buildDiff from './build-difference.js';
import selectFormat from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName) => {
  const file1 = parseByType(filepath1);
  const file2 = parseByType(filepath2);
  const currFormat = selectFormat(formatName);
  return currFormat(buildDiff(file1, file2));
};

export default genDiff;
