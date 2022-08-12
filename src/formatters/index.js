import stylish from './stylish';
import plain from './plain';
import json from './json';

const formatters = { plain, json, stylish };
const selectFormat = (input) => formatters[input];

export default selectFormat;
