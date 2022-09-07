import _ from 'lodash';

const buildDiff = (object1, object2) => {
  const keys = _.sortBy(_.union(_.keys(object1), _.keys(object2)));
  const diff = keys.flatMap((key) => {
    if (!_.has(object2, key)) {
      return { key, value: object1[key], status: 'removed' };
    }
    if (!_.has(object1, key)) {
      return { key, value: object2[key], status: 'added' };
    }
    if (_.isObject(object1[key]) && _.isObject(object2[key])) {
      return {
        key, value: object1[key], status: 'nesed', children: buildDiff(object1[key], object2[key]),
      };
    }
    if (!_.isEqual(object1[key], object2[key])) {
      return {
        key, value: object1[key], status: 'changed', newValue: object2[key],
      };
    }

    return { key, value: object1[key], status: 'unchanged' };
  });
  return diff;
};

export default buildDiff;
