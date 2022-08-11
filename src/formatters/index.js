import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = { plain, stylish, json };
const selectFormat = (input) => formatters[input];

export default selectFormat;
