import yaml from 'js-yaml';
import path from 'path';

const parseByType = (file) => {
  const parse = (path.extname(file) === '.json' ? JSON.parse(file) : yaml.load(file));
  return parse;
};

export default parseByType;
