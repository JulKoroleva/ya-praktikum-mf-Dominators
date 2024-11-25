module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    plugins: ['@typescript-eslint', 'prettier', 'react'],
  },
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    'prettier/prettier': 2,
    'no-console': 1,
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    '@typescript-eslint/no-explicit-any': 2,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'eol-last': ['error', 'always'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
