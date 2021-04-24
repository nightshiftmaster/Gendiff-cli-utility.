const makeSpace = (spacesCount = 2, depth) => {
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
  const lines = Object.entries(value).map(([key, values]) => ` ${makeSpace(2, depth + 3)} ${key}: ${stringify(values, depth + 2)}`);
  return ['{', ...lines, `${makeSpace(2, depth + 2)}}`].join('\n');
};

const stylish = (json) => {
  const iter = (tree, depth) => {
    const result = tree.flatMap((element) => {
      const {
        key, value, status, children, newValue,
      } = element;

      if (status === 'added') {
        return `${makeSpace(2, depth + 1)}+ ${key}: ${stringify(value, depth)}`;
      }
      if (status === 'removed') {
        return `${makeSpace(2, depth + 1)}- ${key}: ${stringify(value, depth)}`;
      }
      if (status === 'unchanged') {
        return `${makeSpace(2, depth + 1)}  ${key}: ${stringify(value, depth)}`;
      }

      if (status === 'changed') {
        return [`${makeSpace(2, depth + 1)}- ${key}: ${stringify(value, depth)}\n${makeSpace(2, depth + 1)}+ ${key}: ${stringify(newValue, depth)}`];
      }

      return ` ${makeSpace(2, depth + 1)} ${key}: ${iter(children, depth + 2)}`;
    });
    return ['{', ...result, `${makeSpace(2, depth)}}`].join('\n');
  };
  return iter(json, 1);
};

export default stylish;
