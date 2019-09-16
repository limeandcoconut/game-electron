'use strict'

module.exports = {
    extends: 'eslint-config-limeandcoconut',
    // parser: 'vue-eslint-parser',
    plugins: [
        'html',
        // TODO: [2019-10-1] Check that eslint-plugin-vue has been upgraded to work with eslint ^6
        // 'vue',
        'unicorn',
    ],
    rules: {
    },
}
