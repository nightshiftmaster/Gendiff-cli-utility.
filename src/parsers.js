import yaml from 'js-yaml';

const parseByType = (type) => {
  const parsers = {
    json: () => JSON.parse,
    yml: () => yaml.load,
  };
  return parsers[type];
};

export default parseByType;
