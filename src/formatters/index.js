import buildDiff from '../build-difference.js';
import stylish from './stylish.js';

const genDiff = (file1, file2, formatter = stylish) => formatter(buildDiff(file1, file2));

export default genDiff;
