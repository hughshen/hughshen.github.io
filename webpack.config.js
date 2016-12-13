module.exports = {
	entry: './app/js/main.js',
	output: {
		filename: './bundle.js'
	},
	module: {
		loaders: [
			{test: /\.html$/, loader: 'raw'},
			{test: /\.less$/, loader: 'style!css!less'},
		],
	},
};
