#!/usr/bin/env node

import program from 'commander';
import stylish from '../src/stylish.js';
import genDiff from '../src/gendiff.js';
import { parseByType } from '../src/parsers.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format (default: "stylish")', stylish)
  .action((filepath1, filepath2) => {
    console.log(stylish(genDiff(parseByType(filepath1), parseByType(filepath2))));
  });

program.parse(process.argv);
