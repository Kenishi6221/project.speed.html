const merge = require('webpack-merge')
const common = require('./webpack.common')

const webpackConfiguration = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        host: '192.168.0.6',
        compress: true,
        inline: true,
    }
})

module.exports = webpackConfiguration