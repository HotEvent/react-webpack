const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
module.exports = {
    entry: {
        app: './src/index.tsx',
    },
    module: {
        rules: [
            {       
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        },
                    },],
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins:[new TsconfigPathsPlugin({})]
    },
    plugins: [
        new webpack.DefinePlugin({ "process.env.PUBLIC_URL": JSON.stringify(".") }),
        new HtmlWebpackPlugin({
            title: 'Development',
            template: './src/index.html'
        }),
        new ScriptExtHtmlWebpackPlugin({
            module: 'app'
        })
    ],
};