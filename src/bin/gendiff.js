#!/usr/bin/env node

import program from 'commander';
import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../index.js';

const getFilePath = (filePath) => path.resolve(process.cwd(), '.', filePath);

const readFile = (filename) => readFileSync(getFilePath(filename), 'utf-8');
program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const file1 = readFile(filepath1);
    const file2 = readFile(filepath2);
    console.log(genDiff(file1, file2, program.opts().format));
  });

program.parse(process.argv);
