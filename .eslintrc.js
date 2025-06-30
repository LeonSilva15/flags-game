// .eslintrc.js (flat config or legacy both work)
module.exports = {
    root: true,
    env: { es2021: true, browser: true },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended' // must be last
    ],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': ['error', {}, { usePrettierrc: true }]
    }
};
