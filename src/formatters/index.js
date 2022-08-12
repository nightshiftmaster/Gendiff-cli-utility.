import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = { plain, json, stylish };
const selectFormat = (input = 'stylish') => formatters[input];

export default selectFormat;
