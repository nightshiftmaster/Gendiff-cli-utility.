import parseByType from './parsers.js';
import buildDiff from './build-difference.js';
import stylish from './formatters/stylish.js';

const genDiff = (file1, file2) => stylish(buildDiff(parseByType(file1), parseByType(file2)));

export default genDiff;
