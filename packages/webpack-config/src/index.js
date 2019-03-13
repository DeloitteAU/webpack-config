const argv = require('yargs').argv;
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const dd = require('./dd.js');

let mode = 'production';
if (process.env.NODE_ENV) {
	mode = process.env.NODE_ENV;
} else if (argv.mode) {
	mode = argv.mode;
} else if (process.env.WEBPACK_SERVE) {
	mode = 'development';
}

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const isDevelopment = mode === 'development';
const isProduction = mode === 'production';

if (!argv.nobranding) {
	dd();
	console.log('Deloitte Digital Webpack Config');
}

if (argv.verbose) {
	console.log('Current working directory:', process.cwd());
	console.log('Mode:', mode);
}

// Base config
// https://webpack.js.org/configuration/#options
const baseConfig = {

	// Chosen mode tells webpack to use its built-in optimizations accordingly.
	mode,

	// Output options related to how webpack emits results
	// https://webpack.js.org/configuration/output/
	output: {
		// name of each output bundle
		filename: '[name].bundle.js',
		// the name of non-entry chunk files.
		chunkFilename: '[name].[chunkhash].chunk.js',
		// The output directory as an absolute path.
		// Resolve the path from the cwd. This is so everything resolves correctly
		// when being executed as a node_modules dependency
		path: path.resolve(process.cwd(), 'dist'),
		// path to resolve dynamic resources
		publicPath: '/dist/',
	},

	// Resolve options
	// https://webpack.js.org/configuration/resolve/
	resolve: {
		// Automatically resolve these extensions
		extensions: ['.js', '.json', '.css', '.scss'],
		// Create alias to src folder
		alias: {
			'~': path.resolve(process.cwd(), 'src'),
		},
	},

	// Module options
	// These options determine how the different types of modules within a project will be treated.
	// https://webpack.js.org/configuration/module/
	module: {
		// Make missing exports throw an error
		strictExportPresence: true,
		rules: [
			// Disable require.ensure as it's not a standard language feature.
			{
				parser: { requireEnsure: false },
			},

			// JavaScript - babel-loader transpiles our javascript to ensure browser compatability
			{
				test: /\.(js|ts)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							// This is a feature of `babel-loader` for webpack (not Babel itself).
							// It enables caching results in ./node_modules/.cache/babel-loader/
							// directory for faster rebuilds.
							cacheDirectory: true,
						},
					},
				],
			},

			// Custom CSS loaders which apply conditionally
			// If a stylesheet is imported into JavaScript, leave the CSS embedded in the JS and dynamically inject into the web page
			// Otherwise, extract the CSS into its own file
			{
				test: /(\.css)|(\.scss)$/,
				oneOf: [
					{
						issuer: /\.js$/,
						use: 'style-loader',
					}, {
						use: MiniCssExtractPlugin.loader,
					},
				],
			},

			// CSS loaders, which should apply to all CSS, including SCSS
			// Note: /(\.css)|(\.scss)$/ and /\.[s]?css$/ match the same files
			// We use seperate regular expressions to prevent webpack-merge from merging the rules together
			{
				test: /\.[s]?css$/,
				use: [
					// css-loader resolves paths in CSS and adds assets as dependencies.
					{
						loader: 'css-loader',
						options: {
							sourceMap: isProduction && shouldUseSourceMap,
							url: false,
							importLoaders: 1,
						},
					},
					// postcss-loader automatically applies browser prefixes to our css.
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: isProduction && shouldUseSourceMap,
							plugins: (mode === 'production') ? [
								autoprefixer(),
								cssnano(),
							] : [
								autoprefixer(),
							],
						},
					},
				],
			},

			// sass-loader converts our sass to css
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'sass-loader',
						options: {
							sourceMap: isProduction && shouldUseSourceMap,
							// Set scss debug flag
							data: `$IS_DEBUG: ${(mode === 'development')};`,
						},
					},
				],
			},

			{
				test: /\.(svg|png|jpg|ico|gif|woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				exclude: [/\.(js|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
				oneOf: [
					// "url" loader works like "file" loader except that it embeds assets
					// smaller than 10000 bytes
					{
						test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
						loader: require.resolve('url-loader'),
						options: {
							limit: 10000,
							name: 'statics/[name].[hash:8].[ext]',
						},
					},

					// "file" loader makes sure those assets get served
					{
						loader: 'file-loader',
						options: {
							name: 'statics/[name].[hash:8].[ext]',
						},
					},
				],
			},

		],
	},

	plugins: [
		// Extract the styles into their own file
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
		// Makes some environment variables available to the JS code
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(mode),
		}),
	],
};

if (process.env.WEBPACK_SERVE) {
	baseConfig.serve = {
		// Silence WebpackServer's own logs since they're generally not useful.
		logLevel: 'error',

		hot: true,

		devMiddleware: {
			get publicPath() { return baseConfig.output.publicPath; },
			set publicPath(val) {
				throw new Error('serve.devMiddleware.publicPath is immutable. Please modify "output.publicPath" instead.');
			},
		},
	};
} else {
	// Generate a report on the bundle
	baseConfig.plugins.push(new BundleAnalyzerPlugin({
		analyzerMode: 'static',
		reportFilename: 'reports/webpack-report.html',
		openAnalyzer: false,
		generateStatsFile: true,
		statsFilename: 'reports/compilation-stats.json',
	}));
}

if (mode === 'development') {
	// You may want 'eval' instead if you prefer to see the compiled output in DevTools.
	baseConfig.devtool = 'cheap-module-source-map';

	// Add module names to factory functions so they appear in browser profiler.
	baseConfig.plugins.push(new webpack.NamedModulesPlugin());
}

const mergeConfig = (a, b) => {
	return merge.smart(a, (typeof b === 'function') ? b({ mode }) : b);
};

const createConfig = userConfig => {
	return mergeConfig(baseConfig, userConfig);
};

module.exports = {
	baseConfig,
	createConfig,
	mergeConfig,
};
