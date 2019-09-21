const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
// const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')

let config = {
  // Doesn't include node contexts
  // target: 'electron-main',
  // Does
  // Could consider switching to two configs
  target: 'electron-renderer',
  // target: 'web',
  mode: isProduction ? 'production' : 'development',
  performance: {
    hints: false,
  },
  entry: {
    // Change name to bundle
    bundle: [
      './client/client-main.js',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'client-bundle.js',
    // chunkFilename: '[id].chunk.js',
  },
  module: {
    noParse: /es6-promise\.js$/,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
          cacheCompression: isProduction,
          compact: isProduction,
          presets: [
            [
              '@babel/preset-env',
              {
                // Do not transform ES6 modules to another format.
                // Webpack will take care of that.
                modules: false,
              },
            ],
          ],
        },
      },
      {
        test: /\.vue$/,
        loader: require.resolve('vue-loader'),
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProduction,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')({
                browsers: ['> 1%', 'last 2 versions'],
              })],
            },
          },
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new WebpackBuildNotifierPlugin({
      title: 'Webpack Build',
      suppressSuccess: true,
    }),
    // TODO: Enforce
    // new CaseSensitivePathsPlugin(),
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
    },
    // Critical for symlinked packages
    symlinks: false,
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty', // eslint-disable-line camelcase
  },
  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  devtool: 'cheap-module-inline-source-map',
}

module.exports = config
