#!/usr/bin/env node

const _ = require('lodash');

const path = require('path');

const { readFileSync } = require('fs');

const { program } = require('commander');

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    filepath1 = readFileSync('/Users/nightshiftmaster/Desktop/frontend-project-lvl2/src/file1.json', 'utf8');
    filepath2 = readFileSync('/Users/nightshiftmaster/Desktop/frontend-project-lvl2/src/file2.json', 'utf8');
    const json1 = JSON.parse(filepath1);
    const json2 = JSON.parse(filepath2);
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
  });
program.parse(process.argv);
