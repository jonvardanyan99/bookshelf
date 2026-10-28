import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import perfectionist from 'eslint-plugin-perfectionist';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactDom from 'eslint-plugin-react-dom';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  js.configs.all,
  react.configs.flat.all,
  react.configs.flat['jsx-runtime'],
  reactDom.configs.recommended,
  {
    extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-invalid-void-type': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
    },
  },
  {
    plugins: {
      perfectionist,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      ...importPlugin.flatConfigs.recommended.rules,
      ...importPlugin.flatConfigs.typescript.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      ...reactHooks.configs['recommended-latest'].rules,

      camelcase: 'off',
      'capitalized-comments': 'off',
      complexity: 'off',
      'id-length': ['error', { exceptions: ['_'] }],

      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-default-export': 'error',
      'import/no-duplicates': 'error',

      'max-lines': ['error', 350],
      'max-lines-per-function': ['error', 350],
      'max-statements': 'off',
      'new-cap': ['error', { capIsNew: false }],
      'no-duplicate-imports': 'off',
      'no-magic-numbers': 'off',
      'no-shadow': 'off',
      'no-ternary': 'off',
      'no-undefined': 'off',
      'no-unused-vars': 'off',
      'no-useless-assignment': 'off',
      'one-var': 'off',

      'perfectionist/sort-interfaces': 'error',
      'perfectionist/sort-object-types': 'error',
      'perfectionist/sort-objects': [
        'error',
        { useConfigurationIf: { objectType: 'destructured' } },
        { type: 'unsorted', useConfigurationIf: { objectType: 'non-destructured' } },
      ],

      'prefer-named-capture-group': 'off',

      'react/forbid-component-props': ['error', { forbid: ['style'] }],
      'react/forbid-dom-props': ['error', { forbid: ['style'] }],
      'react/function-component-definition': 'off',
      'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'react/jsx-max-depth': 'off',
      'react/jsx-no-bind': ['error', { allowArrowFunctions: true }],
      'react/jsx-no-leaked-render': 'off',
      'react/jsx-no-literals': 'off',
      'react/jsx-sort-props': ['error', { ignoreCase: true }],
      'react/jsx-props-no-spreading': 'off',
      'react/prefer-read-only-props': 'off',
      'react/prop-types': 'off',
      'react/require-default-props': 'off',

      'require-unicode-regexp': 'off',

      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'sort-imports': 'off',
      'sort-keys': ['error', 'asc', { caseSensitive: false }],

      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
    },
    settings: {
      ...importPlugin.flatConfigs.typescript.settings,
      'import/resolver': { node: true, typescript: true },
      react: { version: 'detect' },
    },
  },
  {
    // Next.js requires default exports from route files and config files
    files: [
      'src/app/**/{page,layout,template,loading,error,global-error,not-found,default,forbidden,unauthorized}.tsx',
      'src/app/**/{icon,apple-icon,opengraph-image,twitter-image}.tsx',
      'src/app/**/{sitemap,robots,manifest}.ts',
      '*.config.{ts,mjs}',
    ],
    plugins: { import: importPlugin },
    rules: { 'import/no-default-export': 'off' },
  },
  prettierRecommended,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'eslint.config.mjs']),
]);

export default eslintConfig;
