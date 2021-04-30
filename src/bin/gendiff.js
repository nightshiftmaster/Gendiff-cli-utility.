#!/usr/bin/env node

import program from 'commander';
import { readFileSync } from 'fs';
import path from 'path';
import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';
import genDiff from '../formatters/index.js';
import { parseByType } from '../parsers.js';
import json from '../formatters/json.js';

const formaters = [plain, stylish, json];

const getFilePath = (filePath) => path.resolve(process.cwd(), '.', filePath);

const readFile = (filename) => readFileSync(getFilePath(filename), 'utf-8');
program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const file1 = parseByType(readFile(filepath1));
    const file2 = parseByType(readFile(filepath2));
    const index = formaters.map((n) => n.name).indexOf(program.opts().format);
    console.log(genDiff(file1, file2, formaters[index]));
  });

program.parse(process.argv);
