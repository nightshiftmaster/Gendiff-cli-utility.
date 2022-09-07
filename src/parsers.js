import yaml from 'js-yaml';

const getParserByType = (type) => {
  const parsers = {
    json: JSON.parse,
    yml: yaml.load,
  };
  return parsers[type];
};

export default getParserByType;
