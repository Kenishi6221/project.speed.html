const merge = require('webpack-merge')
const common = require('./webpack.common')

const webpackConfiguration = merge(common,
    {
        mode: 'production',
        devtool: 'source-map',
    }
)

module.exports = webpackConfiguration