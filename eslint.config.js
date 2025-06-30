// eslint.config.js — flat-config, ESM
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

import prettierPlugin from 'eslint-plugin-prettier';

import { globalIgnores } from 'eslint/config';
import globals from 'globals';

export default tseslint.config([
    globalIgnores(['dist', 'node_modules']),
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: globals.browser
        },
        plugins: {
            // expose the prettier/* rules
            prettier: prettierPlugin
        },
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs['recommended-latest'],
            reactRefresh.configs.vite
        ],
        rules: {
            // React-specific tweaks
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

            // Prettier integration — honor .prettierrc
            'prettier/prettier': ['error', {}, { usePrettierrc: true }]
        }
    }
]);
