module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': [2, { allow: ['__filename', '__dirname'] }],
    'import/extensions': ['error', 'ignorePackages', {
      js: 'always',
      mjs: 'always',
    }],
  },
};
