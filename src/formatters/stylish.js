const makeSpace = (depth, spacesCount = 2) => {
  const indentSize = spacesCount * depth - spacesCount;
  const currentIndent = ' '.repeat(indentSize);
  return currentIndent;
};

const stringify = (value, depth) => {
  if (typeof value !== 'object') {
    return value.toString();
  }
  if (value === null) {
    return 'null';
  }
  const lines = Object.entries(value).map(([key, values]) => ` ${makeSpace(depth + 3)} ${key}: ${stringify(values, depth + 2)}`);
  return ['{', ...lines, `${makeSpace(depth + 2)}}`].join('\n');
};

const makeStylishFormat = (data) => {
  const iter = (tree, depth) => {
    const elements = tree.flatMap(({
      key, value, status, children, newValue,
    }) => {
      switch (status) {
        case 'added':
          return `${makeSpace(depth + 1)}+ ${key}: ${stringify(value, depth)}`;

        case 'removed':
          return `${makeSpace(depth + 1)}- ${key}: ${stringify(value, depth)}`;

        case 'unchanged':
          return `${makeSpace(depth + 1)}  ${key}: ${stringify(value, depth)}`;

        case 'changed':
          return [`${makeSpace(depth + 1)}- ${key}: ${stringify(value, depth)}\n${makeSpace(depth + 1)}+ ${key}: ${stringify(newValue, depth)}`];

        default:
          return ` ${makeSpace(depth + 1)} ${key}: ${iter(children, depth + 2)}`;
      }
    });
    return ['{', ...elements, `${makeSpace(depth)}}`].join('\n');
  };
  return iter(data, 1);
};

const stylish = (data) => `${makeStylishFormat(data)}\n`;

export default stylish;
