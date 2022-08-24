import yaml from 'js-yaml';
import path from 'path';
import { readFileSync } from 'fs';

const getFilePath = (filePath) => path.resolve(process.cwd(), '.', filePath);

const readFile = (filename) => readFileSync(getFilePath(filename), 'utf-8');

const parseByType = (filePath) => {
  const type = path.extname(filePath).slice(1);
  const file = readFile(filePath);
  const parsers = {
    json: () => JSON.parse(file),
    yml: () => yaml.load(file),
  };
  return parsers[type]();
};
export default parseByType;
