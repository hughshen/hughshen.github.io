module.exports = {
	
	entry: {
		app: './src/main.ts'
	},

	output: {
		filename: './bundle.js'
	},

	htmlLoader: {
		minimize: false // workaround for ng2
	},

	resolve: {
		extensions: ['', '.js', '.ts']
	},

	module: {
		loaders: [
			{
				test: /\.ts$/,
				loaders: ['awesome-typescript-loader', 'angular2-template-loader']
			},
			{
				test: /\.html$/,
				loader: 'html'
			},
			{
				test: /\.less$/,
				loader: 'style!css!less'
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
				loader: 'file?name=assets/[name].[hash].[ext]'
			}
		]
	}
};