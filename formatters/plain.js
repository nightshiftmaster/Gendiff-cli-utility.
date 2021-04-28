import _ from 'lodash';

const makePath = (ancestry, key) => (!_.isEmpty(ancestry) ? [ancestry, key].flat().join('.') : key);

const printValue = (value) => {
  const val = typeof value !== 'string' ? value : `'${value}'`;
  const finalValue = _.isObject(val) ? '[complex value]' : val;
  return finalValue;
};

const makePlainFormat = (data) => {
  const iter = (tree, ancestry) => {
    const elements = tree.flatMap((element) => {
      const {
        key, value, status, children, newValue,
      } = element;

      const pathToKey = makePath(ancestry, key);
      if (status === 'added') {
        return `Property '${pathToKey}' was added with value: ${printValue(value)}`;
      }
      if (status === 'removed') {
        return `Property '${pathToKey}' was removed`;
      }
      if (status === 'changed') {
        return `Property '${pathToKey}' was updated. From ${printValue(value)} to ${printValue(newValue)}`;
      }
      if (status === 'unchanged') {
        return [];
      }
      return `${iter(children, [...ancestry, key])}`;
    });
    return elements.join('\n');
  };
  return iter(data, []);
};

const plain = (data) => makePlainFormat(data);
export default plain;
