import globals from 'globals';
import cypressESLintPlugin from 'eslint-plugin-cypress';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...cypressESLintPlugin.environments.globals.globals,
      },
    },
  },
  {
    plugins: {
      cypress: cypressESLintPlugin,
    },
  },
  {
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      eqeqeq: ['error', 'allow-null'],
      'no-multi-spaces': 'error',
      'no-multiple-empty-lines': 'error',
      'node/no-missing-import': 'off',
      'no-duplicate-imports': ['error', { includeExports: true }],
      'no-empty': 'off',
      'no-empty-function': 'error',
      'no-var': 'error',
    },
  },
  {
    rules: {
      'cypress/no-assigning-return-values': 'error',
      'cypress/unsafe-to-chain-command': 'error',
      'cypress/no-unnecessary-waiting': 'error',
      'cypress/no-async-tests': 'error',
      'cypress/no-pause': 'error',
    },
  },
];
