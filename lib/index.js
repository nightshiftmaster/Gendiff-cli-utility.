import _ from 'lodash';

import path from 'path';

import { readFileSync } from 'fs';

const gendiff = (file1, file2) => {
  const j1 = readFileSync(path.resolve(file1), 'utf8');
  const j2 = readFileSync(path.resolve(file2), 'utf8');
  const json1 = JSON.parse(j1);
  const json2 = JSON.parse(j2);
  const keys = _.sortBy(_.union(_.keys(json1), _.keys(json2)));
  const mergedJson = _.merge(_.clone(json1), _.clone(json2));
  const compareJson = keys.reduce((newJson, key) => {
    let statusSymbol = '';
    if (!_.has(json2, key)) {
      statusSymbol = '-';
    } else if (!_.has(json1, key)) {
      statusSymbol = '+';
    } else if (mergedJson[key] !== json1[key]) {
      statusSymbol = '+';
      newJson = [...newJson, ` ${'-'} ${key}: ${json1[key]}`];
    } else {
      statusSymbol = ' ';
    }
    const line = [...newJson, ` ${statusSymbol} ${key}: ${mergedJson[key]}`];
    return line;
  }, []);
  const comparedJson = ['{', ...compareJson, '}'].join('\n');
  console.log(comparedJson);
};

export default gendiff;
