const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer')();

const cssLoader = {
	loader: 'css-loader',
	options: {
		sourceMap: true,
		minimize: !process.env.WEBPACK_SERVE,
	},
};

const postcssLoader = {
	loader: 'postcss-loader',
	options: {
		sourceMap: true,
		plugins: () => [
			autoprefixer,
		],
	},
};

const sassLoader = {
	loader: 'sass-loader',
	options: {
		sourceMap: true,
	},
};

const config = {
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
							postcssLoader,
							sassLoader,
						],
					}, {
						// Otherwise, extract the CSS into its own file
						// This is not used in development mode because it is not compatible with fast '#eval-source-map'
						use: [
							MiniCssExtractPlugin.loader,
							cssLoader,
							postcssLoader,
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

if (process.env.WEBPACK_SERVE) {
	config.serve = {
		dev: {
			publicPath: '/dist/',
		},
	};
}

module.exports = config;
