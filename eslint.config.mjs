import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  js.configs.all,
  react.configs.flat.all,
  {
    extends: [tseslint.configs.strictTypeChecked],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      // Relaxed: conflict with TypeScript, React, next/font or the component idiom in CLAUDE.md
      camelcase: ['error', { ignoreImports: true }],
      'capitalized-comments': 'off',
      'id-length': 'off',
      'import/no-default-export': 'error',
      'max-lines': ['error', 350],
      'max-lines-per-function': ['error', 350],
      'max-statements': 'off',
      'new-cap': ['error', { capIsNew: false }],
      'no-magic-numbers': 'off',
      'no-ternary': 'off',
      'no-undefined': 'off',
      'one-var': ['error', 'never'],
      'react/forbid-component-props': ['error', { forbid: ['style'] }],
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      'react/jsx-max-depth': 'off',
      'react/jsx-no-bind': ['error', { allowArrowFunctions: true }],
      'react/jsx-no-literals': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',

      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'sort-imports': 'off',
    },
    settings: { react: { version: 'detect' } },
  },
  {
    // Next.js requires default exports from route files and config files
    files: [
      'src/app/**/{page,layout,template,loading,error,global-error,not-found,default}.tsx',
      '*.config.{ts,mjs}',
    ],
    plugins: { import: importPlugin },
    rules: { 'import/no-default-export': 'off' },
  },
  prettier,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
