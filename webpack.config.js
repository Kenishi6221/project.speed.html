const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const webpackConfiguration = {
    mode: 'development',
    entry: [
        path.resolve(__dirname, "index.js")
    ],
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        compress: true,
        inline: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "/images/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new cleanWebpackPlugin('dist'),
        new MiniCssExtractPlugin({
            filename: "/css/estilos.css",
            chunkFilename: "[id].css"
        }),
        new htmlWebpackPlugin({
            template: "./index.html",
        }),
    ]
}

module.exports = webpackConfiguration