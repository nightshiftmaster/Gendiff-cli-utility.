module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-var': 'off',
    'no-console': 'off',
    'no-underscore-dangle': [2, { allow: ['__filename', '__dirname'] }],
    'import/extensions': ['error', 'ignorePackages', {
      js: 'always',
      mjs: 'always',
    }],
  },
};
