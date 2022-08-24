import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = { stylish, plain, json };
const selectFormat = (format) => formatters[format];

export default selectFormat;
