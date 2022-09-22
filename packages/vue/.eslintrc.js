module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    // 'plugin:vue/essential',
    // '@vue/standard'
  ],
  plugins: ['vue'],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-undef': 'off',
    camelcase: 'off',
    semi: ['error', 'never'], // 使用分号, 默认true
    singleQuote: 2, // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
    'object-curly-spacing': [0, 'never'], // 大括号内空格一致
    'vue/singleline-html-element-content-newline': 0,
    'comma-dangle': [2, 'never'],
    'comma-style': [2, 'last'],
    'array-element-newline': [
      2,
      {
        multiline: true,
        minItems: 1
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
