const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
  printWidth: 120,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'avoid',
  requirePragma: false,
  proseWrap: 'preserve',
  endOfLine: 'auto'
};
