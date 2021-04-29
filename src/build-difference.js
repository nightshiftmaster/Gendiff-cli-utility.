import _ from 'lodash';

const buildDiff = (file1, file2) => {
  const keys = _.sortBy(_.union(_.keys(file1), _.keys(file2)));
  const compareFiles = keys.flatMap((key) => {
    if (!_.has(file2, key)) {
      return { key, value: file1[key], status: 'removed' };
    }
    if (!_.has(file1, key)) {
      return { key, value: file2[key], status: 'added' };
    }
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      const children = buildDiff(file1[key], file2[key]);
      return {
        key, value: file1[key], status: 'nesed', children,
      };
    }
    if (!_.isEqual(file1[key], file2[key])) {
      return {
        key, value: file1[key], status: 'changed', newValue: file2[key],
      };
    }

    return { key, value: file1[key], status: 'unchanged' };
  });
  return compareFiles;
};

export default buildDiff;
