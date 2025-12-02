/**
 * @type {import("prettier").Config}
 */
const config = {
  printWidth: 100,
  singleAttributePerLine: true,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'always',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['^react$', '<THIRD_PARTY_MODULES>', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
};

export default config;
