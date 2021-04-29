import buildDiff from '../build-difference.js';

const genDiff = (file1, file2, formatter) => formatter(buildDiff(file1, file2));

export default genDiff;
