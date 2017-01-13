var path = require('path');
var webpack = require('webpack');

var config = {
    entry: [
        path.resolve(__dirname, 'app/main.js'),
    ],
    output: {
        path: path.resolve(__dirname, ''),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', 'less']
    },
    module: {
        loaders: [
            {test: /\.html$/, loader: 'raw'},
            {test: /\.less$/, loader: 'style!css!less'},
            {test: /\.jsx?$/, loader: 'babel'},
        ],
    },
};

if (process.env.NODE_ENV === 'production') {
    config.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ];
}

module.exports = config;