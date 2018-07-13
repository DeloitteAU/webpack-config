const path = require('path')
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const config = require('@deloitte-digital-au/webpack-config');
const srcDir = path.resolve(process.cwd(), 'src');
const tsConfigFile = path.resolve(process.cwd(), 'tsconfig.json');

const recursiveFilterLoader = loaderName => loaders => {
	if (Array.isArray(loaders)) {
		return loaders.some(recursiveFilterLoader(loaderName))
	}else if (typeof loaders === "object") {
		return recursiveFilterLoader(loaderName)(loaders.loader)
	} else if(typeof loaders === "string"){
		return loaders === loaderName
	}
	return false
}

const resolve = {
	...config.resolve,
	alias: {
		...(config.resolve.alias || {}),
		'~': srcDir,
	},
	extensions: [
		'.tsx', '.jsx', '.ts',
		...config.resolve.extensions,
	],
	plugins: [
		...(config.resolve.plugins || []),
		new TsconfigPathsPlugin({ configFile: tsConfigFile }),
	],
}

const rules = [
	// remove babel loader
	...config.module.rules.filter(({use}) => !use || !recursiveFilterLoader("babel-loader")(use)),
	// Typescript loader
	{
		test: /\.[tj]sx?$/,
		use: [
			{
				loader: 'babel-loader',
			},
			{
				// Typescript loader
				// Documentation: https://github.com/TypeStrong/ts-loader
				loader: "ts-loader",
				options: {
					// disable type checker - we will use it in fork plugin
					transpileOnly: true,
				}
			},
		],
	},
]


const plugins = [
	// Copy plugins from base config
	...config.plugins,
	// Perform type checking in a separate process to speed up compilation
	// Documentation: https://github.com/Realytics/fork-ts-checker-webpack-plugin
	new ForkTsCheckerWebpackPlugin({
		async: false,
		watch: srcDir,
		tsconfig: tsConfigFile,
	}),
]

//
// Merge configurations
// --------------------------------------------------------
module.exports = {
	...config,
	resolve,
	module:{
		...config.module,
		rules,
	},
	plugins,
}
