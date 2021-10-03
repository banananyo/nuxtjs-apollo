module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    // 'plugin:vue/vue3-essential',
    // 'plugin:vue/essential',
    // 'plugin:vue/vue3-strongly-recommended',
    // 'plugin:vue/strongly-recommended',
    // 'plugin:vue/vue3-recommended',
    // 'plugin:vue/recommended',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-tabs': ['error', { allowIndentationTabs: true }],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
