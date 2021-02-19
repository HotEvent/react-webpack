const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path')
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
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
        // plugins:[new TsconfigPathsPlugin({})]
    },
    plugins: [
        new webpack.DefinePlugin({ "process.env.PUBLIC_URL": JSON.stringify(".") }),
        new HtmlWebpackPlugin({
            title: 'Development',
            template: './src/index.html'
        }),
        // new ScriptExtHtmlWebpackPlugin({
        //     module: 'app'
        // })
    ],
};