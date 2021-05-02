import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const selectFormat = (input) => {
  const formatters = { plain, stylish, json };
  return formatters[input];
};

export default selectFormat;
