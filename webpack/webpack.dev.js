const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')

const webpackConfiguration = env => {

    const devConfiguration = {
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
            host: '192.168.0.7',
            compress: true,
            inline: true,
            publicPath: '/',
            //contentBase: path.join(__dirname, '/speed/'),
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ],
                }
            ]
        }
    }

    const commonConfiguration = common(env)
    return merge(commonConfiguration, devConfiguration)
}

module.exports = webpackConfiguration