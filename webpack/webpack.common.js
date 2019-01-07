const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')

const relativePosition = '../'
const folderOutuput = "speed"
const outuputPath = `${relativePosition}${folderOutuput}`

let pathsToClean = [
    folderOutuput
]

let cleanOptions = {
    root: path.resolve(__dirname, relativePosition)
}

const commonConfiguration = () => {
    return {
        entry: [
            path.resolve(__dirname, "../index.js")
        ],
        output: {
            filename: "src/js/[name].[hash].js",
            path: path.resolve(__dirname, outuputPath),
            publicPath: "./speed"
        },
        module: {
            rules: [
                {
                    test: /.*\.(png|svg|jpg|gif)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: "src/assets/images/[name].[ext]",
                                useRelativePath: true,
                                publicPath: './speed/'
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: "src/assets/images/[name].[ext]",
                                publicPath: './speed/'
                            }
                        }
                    ]
                },
                {
                    test: /\.hbs$/,
                    use: [
                        'handlebars-loader'
                    ]
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        },
        plugins: [
            new cleanWebpackPlugin(pathsToClean, cleanOptions),
            new htmlWebpackPlugin({
                template: "./index.hbs",
                inject: false,
                minify: {
                    removeComments: true,
                    // collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                },
            }),
        ]
    }
}

module.exports = commonConfiguration