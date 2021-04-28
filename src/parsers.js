import yaml from 'js-yaml';
import path from 'path';

export const parseYml = (file) => yaml.load(file);

export const parseJson = (file) => JSON.parse(file);

export const parseByType = (file) => {
  const parse = (path.extname(file) === '.json' ? parseJson(file) : parseYml(file));
  return parse;
};
