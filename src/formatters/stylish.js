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
  const lines = Object.entries(value).map(([key, values]) => ` ${makeSpace(depth + 3, 2)} ${key}: ${stringify(values, depth + 2)}`);
  return ['{', ...lines, `${makeSpace(depth + 2, 2)}}`].join('\n');
};

const makeStylishFormat = (data) => {
  const iter = (tree, depth) => {
    const elements = tree.flatMap((element) => {
      const {
        key, value, status, children, newValue,
      } = element;
      let newElement;
      switch (status) {
        case 'added':
          newElement = `${makeSpace(depth + 1, 2)}+ ${key}: ${stringify(value, depth)}`;
          break;

        case 'removed':
          newElement = `${makeSpace(depth + 1, 2)}- ${key}: ${stringify(value, depth)}`;
          break;

        case 'unchanged':
          newElement = `${makeSpace(depth + 1, 2)}  ${key}: ${stringify(value, depth)}`;
          break;

        case 'changed':
          newElement = [`${makeSpace(depth + 1, 2)}- ${key}: ${stringify(value, depth)}\n${makeSpace(depth + 1, 2)}+ ${key}: ${stringify(newValue, depth)}`];
          break;

        default:
          newElement = ` ${makeSpace(depth + 1, 2)} ${key}: ${iter(children, depth + 2)}`;
          break;
      }
      return newElement;
    });
    return ['{', ...elements, `${makeSpace(depth, 2)}}`].join('\n');
  };
  return iter(data, 1);
};

const stylish = (data) => makeStylishFormat(data);

export default stylish;
