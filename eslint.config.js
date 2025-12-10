import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

const reactRules = {
  ...react.configs.recommended.rules,
  ...reactHooks.configs.recommended.rules,
  'react-refresh/only-export-components': 'warn',
  'react/react-in-jsx-scope': 'off',
  'react/jsx-uses-react': 'off',
};

const a11yRules = {
  ...jsxA11y.configs.recommended.rules,
};

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**', 'tools/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}', '**/*.js', '**/*.jsx'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      prettier,
      import: importPlugin,
    },
    languageOptions: {
      parserOptions: {
        project: [
          './tsconfig.global.json',
          './demo/tsconfig.json',
          './packages/el-transito/tsconfig.json',
        ],
      },
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: [
            './tsconfig.json',
            './demo/tsconfig.json',
            './packages/el-transito/tsconfig.json',
          ],
        },
      },
    },
    rules: {
      ...reactRules,
      ...a11yRules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  }
);
