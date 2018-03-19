const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].css');

module.exports = {
	mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
	devtool: '#source-map',
	module: {
		rules: [{
			test: /\.scss$/,
			oneOf: [
				{
					// If the extension is .js.scss, leave the CSS embedded in the JS file
					test: /\.js\.scss$/,
					use: [
						'style-loader',
						'css-loader',
						'sass-loader'
					]
				}, {
					// Otherwise, extract the CSS into its own file
					use: extractCSS.extract({
						use: [
							{
								loader: 'css-loader',
								options: {
									sourceMap: true
								}
							}, {
								loader: 'sass-loader',
								options: {
									sourceMap: true
								}
							}
						],
						fallback: 'style-loader'
					})
				}
			]
		}]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		extractCSS
	]
};
