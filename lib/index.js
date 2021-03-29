import _ from 'lodash';

const gendiff = (json1, json2) => {
  const keys = _.sortBy(_.union(_.keys(json1), _.keys(json2)));

  const mergedJson = _.merge(_.clone(json1), _.clone(json2));

  const compareJson = keys.reduce((line, key) => {
    let statusSymbol = '';
    if (!_.has(json2, key)) {
      statusSymbol = '-';
    } else if (!_.has(json1, key)) {
      statusSymbol = '+';
    } else if (mergedJson[key] !== json1[key]) {
      statusSymbol = '+';
      line.push(` ${'-'} ${key}: ${json1[key]}`);
    } else {
      statusSymbol = ' ';
    }
    const newData = [...line, ` ${statusSymbol} ${key}: ${mergedJson[key]}`];
    return newData;
  }, []);

  const comparedJson = ['{', ...compareJson, '}'].join('\n');

  return comparedJson;
};

export default gendiff;
