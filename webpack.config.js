module.exports = {
	entry: './app/app.js',
	output: {
		filename: './bundle.js'
	},
	resolve: {
		extensions: ['', '.js', 'less', 'html']
	},
	module: {
		loaders: [
			{test: /\.html$/, loader: 'raw'},
			{test: /\.less$/, loader: 'style!css!less'},
		],
	},
};
