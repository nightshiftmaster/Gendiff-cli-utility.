import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const selectFormat = (format) => {
  const formatters = { stylish, plain, json };
  return formatters[format];
};

export default selectFormat;
