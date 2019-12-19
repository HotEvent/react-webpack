const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const tsImportPluginFactory = require('ts-import-plugin');
module.exports = {
    entry: {
        app: './src/index.tsx',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [tsImportPluginFactory({
                            libraryName: 'antd',
                            libraryDirectory: 'es',
                            style: 'css'
                        })]
                    })
                }
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
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new webpack.DefinePlugin({ "process.env.PUBLIC_URL": JSON.stringify(".") }),
        new HtmlWebpackPlugin({
            title: 'Development',
            template: './src/index.html'
        })
    ],
};