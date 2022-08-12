import _ from 'lodash';

const makePath = (ancestry, key) => (!_.isEmpty(ancestry) ? [ancestry, key].flat().join('.') : key);

const printValue = (value) => {
  const val = typeof value !== 'string' ? value : `'${value}'`;
  const finalValue = _.isObject(val) ? '[complex value]' : val;
  return finalValue;
};

const makePlainFormat = (data) => {
  const iter = (tree, ancestry) => {
    const elements = tree.flatMap(({
      key, value, status, children, newValue,
    }) => {
      const path = makePath(ancestry, key);
      switch (status) {
        case 'added':
          return `Property '${path}' was added with value: ${printValue(value)}`;

        case 'removed':
          return `Property '${path}' was removed`;

        case 'changed':
          return `Property '${path}' was updated. From ${printValue(value)} to ${printValue(newValue)}`;
        case 'unchanged':
          return [];
        default:
          return `${iter(children, [...ancestry, key])}`;
      }
    });
    return elements.join('\n');
  };
  return iter(data, []);
};

const plain = (data) => makePlainFormat(data);

export default plain;
