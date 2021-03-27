#!/usr/bin/env node

import program from 'commander';
import path from 'path';
import { readFileSync } from 'fs';
import gendiff from './lib/index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const file1 = readFileSync(path.resolve(filepath1), 'utf8');
    const file2 = readFileSync(path.resolve(filepath2), 'utf8');
    const json1 = JSON.parse(file1);
    const json2 = JSON.parse(file2);
    console.log(gendiff(json1, json2));
  });

program.parse(process.argv);
