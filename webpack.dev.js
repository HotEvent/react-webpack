const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './src/static',
        historyApiFallback: true
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "postcss-loader",
                    "css-loader", // translates CSS into CommonJS
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "postcss-loader",
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "postcss-loader",
                    "less-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            }
        ]
    },
    output: {
        filename: '[name].bundle.js',
    }
});