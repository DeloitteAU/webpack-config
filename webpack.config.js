const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const cssLoader = {
	loader: 'css-loader',
	options: {
		sourceMap: true,
		minimize: !process.env.WEBPACK_SERVE,
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
							'style-loader',
							cssLoader,
							sassLoader,
						],
					}, {
						// Otherwise, extract the CSS into its own file
						// This is not used in development mode because it is not compatible with fast '#eval-source-map'
						use: [
							MiniCssExtractPlugin.loader,
							cssLoader,
							sassLoader,
						],
					},
				],
			}, {
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
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
	],
};
