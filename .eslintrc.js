module.exports = {
    root: true,

    env: {
        node: true
    },

    extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],

    parserOptions: {
        parser: 'babel-eslint'
    },

    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        indent: [1, 4],
        'space-before-function-paren': 0,
        'no-trailing-spaces': 0,
        'no-tabs': 'off',
        'comma-dangle': ['error', 'always-multiline'],
        'no-extend-native': 0
    },

    'extends': [
      'plugin:vue/essential',
      'eslint:recommended',
      '@vue/prettier'
    ]
};
