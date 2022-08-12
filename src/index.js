import parseByType from './parsers';
import buildDiff from './build-difference';
import selectFormat from './formatters/index';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = parseByType(filepath1);
  const file2 = parseByType(filepath2);
  const currFormat = selectFormat(formatName);
  return currFormat(buildDiff(file1, file2));
};

export default genDiff;
