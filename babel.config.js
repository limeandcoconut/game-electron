module.exports = {
    compact: true,
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                useBuiltIns: 'entry',
            },
        ],
    ],
    // These seeem to be necessary for useBuiltIns: 'usgae' to work properly
    sourceType: 'unambiguous',
    ignore: [/[\/\\]core-js/, /@babel[\/\\]runtime/],
    //
    plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-syntax-dynamic-import',
        ['@babel/plugin-transform-runtime',
            {
                regenerator: true,
            },
        ],
    ],
    env: {
        test: {
            plugins: [
                '@babel/plugin-transform-modules-commonjs',
                '@babel/plugin-syntax-dynamic-import',
            ],
        },
    },
}
