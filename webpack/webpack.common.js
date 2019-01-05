const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')

let cleanOptions = {
    root: path.resolve(__dirname, '../'),
    exclude: ['estilos.css', 'lazyLoadImages.js', 'menu.js'],
}

const commonConfiguration = env => {
    const outuputPath = env && env.outuputPath || "../dist"

    const relativeToRoot = outuputPath.replace('../', './')
    console.log('relative to root', relativeToRoot)

    let pathsToClean = [
        'dist',
        `${relativeToRoot}/src/css`,
        `${relativeToRoot}/src/js`,
        `${relativeToRoot}/*.html`
    ]

    console.log('relative paths', pathsToClean)

    console.log("outuput path is... ", outuputPath)

    return {
        entry: [
            path.resolve(__dirname, "../index.js")
        ],
        output: {
            filename: "src/js/[name].[hash].js",
            path: path.resolve(__dirname, outuputPath),
            publicPath: './'
        },
        module: {
            rules: [
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: "/src/assets/images/[name].[ext]"
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
                                name: '/src/assets/fonts/[name].[ext]'
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