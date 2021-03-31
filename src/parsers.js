import yaml from 'js-yaml';

import { readFileSync } from 'fs';

import path from 'path';

export const parseYml = (file) => yaml.load(readFileSync(path.resolve(file), 'utf8'));

export const parseJson = (file) => JSON.parse(readFileSync(path.resolve(file), 'utf8'));

export const parseByType = (file) => {
  const parse = (path.extname(file) === '.json' ? parseJson(file) : parseYml(file));
  return parse;
};
