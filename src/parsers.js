import yaml from 'js-yaml';

import { readFileSync } from 'fs';

import { fileURLToPath } from 'url';

import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFilePath = (filename) => path.join(__dirname, '..', 'files', filename);

const readFile = (filename) => readFileSync(getFilePath(filename), 'utf-8');

export const parseYml = (file) => yaml.load(readFile(file));

export const parseJson = (file) => JSON.parse(readFile(file));

export const parseByType = (file) => {
  const parse = (path.extname(file) === '.json' ? parseJson(file) : parseYml(file));
  return parse;
};
