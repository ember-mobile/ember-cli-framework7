module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module'
  },
  extends: [
    'plugin:ember-suave/recommended'
  ],
  env: {
    'browser': true
  },
  rules: {
    'strict': 0,
    'key-spacing': [2, {
      'align': 'value'
    }]
  }
};
