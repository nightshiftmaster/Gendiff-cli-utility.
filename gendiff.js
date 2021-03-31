#!/usr/bin/env node

import program from 'commander';
import gendiff from './src/index.js';
import { parseByType } from './src/parsers.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    console.log(gendiff(parseByType(filepath1), parseByType(filepath2)));
  });

program.parse(process.argv);
