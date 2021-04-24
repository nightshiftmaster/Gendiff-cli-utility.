import _ from 'lodash';

const genDiff = (json1, json2) => {
  const keys = _.sortBy(_.union(_.keys(json1), _.keys(json2)));
  const compareJsons = keys.flatMap((key) => {
    const val1 = json1[key];
    const val2 = json2[key];
    if (!_.has(json2, key)) {
      return { key, value: val1, status: 'removed' };
    }
    if (!_.has(json1, key)) {
      return { key, value: val2, status: 'added' };
    }
    if (_.isObject(val1) && _.isObject(val2)) {
      const children = genDiff(val1, val2);
      return {
        key, value: val1, status: 'nesed', children,
      };
    }
    if (!_.isEqual(val1, val2)) {
      return {
        key, value: val1, status: 'changed', newValue: val2,
      };
    }

    return { key, value: val1, status: 'unchanged' };
  });
  return compareJsons;
};

export default genDiff;
