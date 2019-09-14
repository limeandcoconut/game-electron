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
        // '@babel/preset-react',
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

// module.exports = {
//     presets: ['@babel/preset-env'],
//     plugins: [
//       [
//         'module-resolver',
//         {
//           // https://github.com/tleunen/babel-plugin-module-resolver/issues/338
//           // There seem to be a bug with module-resolver with a mono-repo setup:
//           // It doesn't resolve paths correctly when using root/alias combo, so we
//           // use this function instead.
//         //   resolvePath(sourcePath) {
//             // This will return undefined if aliases has no key for the sourcePath,
//             // in which case module-resolver will fallback on its default behaviour.
//             // return aliases[sourcePath];
//         //   },
//         },
//       ],
//     ],
//   };
