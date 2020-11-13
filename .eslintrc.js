const env = process.env.NODE_ENV;

module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    // "prettier/prettier": "off",
    strict: 'off',
    'no-console': 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'require-yield': 'off',

    // "no-param-reassign": "off",
    'no-param-reassign': ['warn', { props: false }],
    'no-return-assign': 'warn',
    'no-nested-ternary': 'off',
    'no-shadow': 'warn',
    // 如果是开发环境，no-unused-vars 改为警告
    'no-unused-vars': !env || env === 'dev' ? 'warn' : 'error',
    'no-debugger': !env || env === 'dev' ? 'warn' : 'error',

    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/jsx-key': 'warn',
    'react/no-this-in-sfc': 'error',
    'react/self-closing-comp': 'warn',
    'react-hooks/exhaustive-deps': 'off'
  }
};
