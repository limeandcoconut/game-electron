const path = require('path')
const webpack = require('webpack')
const isProduction = process.env.NODE_ENV === 'production'

let config = {
    devtool: '#eval-source-map',
    entry: {
        app: './client/client_main.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'client-bundle.js',
    },
    module: {
        noParse: /es6-promise\.js$/,
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'babel-loader',
                        scss: 'vue-style-loader!css-loader!sass-loader',
                    },
                },
            },
        ],
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     filename: 'client-vendor-bundle.js',
        // }),
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        },
    },
}

module.exports = config
