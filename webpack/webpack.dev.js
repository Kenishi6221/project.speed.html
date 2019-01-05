const merge = require('webpack-merge')
const common = require('./webpack.common')

const webpackConfiguration = env => {
    const commonConfiguration = common(env)
    const devConfiguration = {
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
            host: '192.168.0.6',
            compress: true,
            inline: true,
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

    return merge(commonConfiguration, devConfiguration)
}

module.exports = webpackConfiguration