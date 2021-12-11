var path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var TSLintPlugin = require('tslint-webpack-plugin');

var entries = {};

entries.app = ["./src/index.tsx"];

module.exports = {
    entry: entries,
    module: {
        rules: [
            {
                test: /\.raw.cpp$/i,
                use: 'raw-loader',
            },
            {
                test: /.bdf$/,
                use: 'raw-loader',
                exclude: /node_modules/,
                include: /src/
            },
            {
                test: /.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
                include: /src/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader",],
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].bundle.min.js"
    },
    devtool: 'inline-source-map',
    devServer: {
        static: "dist/",
        port: 8081,
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:8080/api/',
        //         secure: false
        //     }
        // }
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'node_modules/monaco-editor/min/vs',
                    to: 'vs'
                },
                {
                    from: 'src/bdf/**/*.bdf',
                    to: 'bdf',
                    flatten: true
                }
            ]
        }),
        new TSLintPlugin({
            files: ['./src/**/*.ts'],
            config: './tslint.json'
        })
    ]
};
