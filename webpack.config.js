const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractCSS = new ExtractTextPlugin('[name].css');

const styleLoader = {
	loader: 'style-loader',
	options: {
		sourceMap: true,
	},
};

const cssLoader = {
	loader: 'css-loader',
	options: {
		sourceMap: true,
	},
};

const sassLoader = {
	loader: 'sass-loader',
	options: {
		sourceMap: true,
	},
};

module.exports = {
	mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
	devtool: process.env.WEBPACK_SERVE ? '#eval-source-map' : '#source-map',
	module: {
		rules: [
			{
				test: /\.scss$/,
				oneOf: [
					{
						// If the extension is .js.scss, leave the CSS embedded in the JS file
						test: /\.js\.scss$/,
						use: [
							styleLoader,
							cssLoader,
							sassLoader,
						],
					}, {
						// Otherwise, extract the CSS into its own file
						use: extractCSS.extract({
							use: [
								cssLoader,
								sassLoader,
							],
							fallback: styleLoader,
						}),
					},
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'env',
						],
					},
				},
			},
		],
	},
	plugins: [
		// Clean the 'dist' folder before building
		new CleanWebpackPlugin(['dist']),
		extractCSS,
	],
};
