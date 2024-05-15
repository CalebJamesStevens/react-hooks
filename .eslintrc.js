/**
 * @type {import("@types/eslint").Linter.BaseConfig}
 */
module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['prettier'],
  globals: {
    process: true
  },
  rules: {
    'prettier/prettier': [
      2,
      {
        semi: false,
        trailingComma: 'none',
        singleQuote: true,
        printWidth: 120,
        endOfLine: 'auto'
      }
    ]
  }
}
