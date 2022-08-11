import yaml from 'js-yaml';
import path from 'path';

const parseByType = (filePath, readFileFunction) => {
  const type = path.extname(filePath).slice(1);
  const file = readFileFunction(filePath);
  const map = {
    json: () => JSON.parse(file),
    yml: () => yaml.load(file),
  };
  return map[type]();
};

export default parseByType;
