// Source: https://gist.github.com/Ambroos/f23d517a4261e52b4591224b4c8df826

import webpack from 'webpack';
import path from 'path';

import CleanPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import autoprefixer from 'autoprefixer';
import rucksack from 'rucksack-css';
import cssnano from 'cssnano';
import moment from 'moment';

const sharedPlugins = [
	new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nl/),
	new webpack.optimize.AggressiveMergingPlugin({}),
	new webpack.optimize.OccurenceOrderPlugin(true),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			drop_console: true,
			screw_ie8: true,
			sequences: true,
			properties: true,
			dead_code: true,
			drop_debugger: true,
			conditionals: true,
			comparisons: true,
			evaluate: true,
			booleans: true,
			loops: true,
			unused: true,
			if_return: true,
			join_vars: true,
			cascade: true,
			negate_iife: true,
			hoist_funs: true,
			warnings: false,
		},
		mangle: {
			screw_ie8: true,
		},
		output: {
			screw_ie8: true,
			preamble: '/* Website - ' + moment().format() + ' */',
		},
	}),
];

const sharedServerPlugins = [
	new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nl/),
	new webpack.optimize.AggressiveMergingPlugin({}),
	new webpack.optimize.OccurenceOrderPlugin(true),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			drop_console: false,
			screw_ie8: true,
			sequences: true,
			properties: true,
			dead_code: true,
			drop_debugger: false,
			conditionals: true,
			comparisons: true,
			evaluate: true,
			booleans: true,
			loops: true,
			unused: true,
			if_return: true,
			join_vars: true,
			cascade: true,
			negate_iife: true,
			hoist_funs: true,
			warnings: false,
		},
		mangle: {
			screw_ie8: true,
		},
		output: {
			screw_ie8: true,
			preamble: '/* Website - ' + moment().format() + ' */',
		},
	}),
];

const PATHS = {
	build: path.resolve(__dirname, '..', 'build'),
	sourcemaps: path.resolve(__dirname, '..', 'build', 'sourcemaps'),
	browserSource: path.resolve(__dirname, '..', 'src', 'browser', 'index.js'),//entry point
	browserBuild: path.resolve(__dirname, '..', 'build', 'browser'),
	serverSource: path.resolve(__dirname, '..', 'src', 'server', 'index.js'),
	serverAssetsSource: path.resolve(__dirname, '..', 'src', 'server', 'assets', 'index.js'),
	serverBuild: path.resolve(__dirname, '..', 'build', 'server'),
};

export default [
	// Browser
	{
		entry: { browser: PATHS.browserSource },
		output: {
			path: PATHS.browserBuild,
			filename: 's/[chunkhash].js',
			chunkFilename: 's/async-[chunkhash].js',
			publicPath: '/',
			sourceMapFilename: '../sourcemaps/browser/[file].map',
		},
		devtool: 'hidden-source-map',
		plugins: [
			new AssetsPlugin({
				prettyPrint: true,
				path: path.resolve(PATHS.build, 'browserAssets'),
				filename: 'index.js',
				processOutput: assets => `module.exports = ${JSON.stringify(assets, null, '    ')};`,
			}),
			new CleanPlugin([PATHS.browserBuild, PATHS.sourcemaps], path.resolve(PATHS.build, 'browserAssets')),
			new ExtractTextPlugin('s/[contenthash].css'),
			new CompressionPlugin({
				asset: '{file}.gz',
				algorithm: 'gzip',
				regExp: /\.js$|\.html$|\.css$|\.svg$|\.eot$|\.xml$/,
				threshold: 1400,
				minRation: 0.8,
			}),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('production'),
					WEBPACK_ENV: JSON.stringify('browser'),
					APP_ENV: (process.env.APP_ENV && JSON.stringify(process.env.APP_ENV)) || undefined,
				},
			}),
		].concat(sharedPlugins),
		externals: [
			{ browserConfig: 'var websiteBrowserConfig' },
			{ programs: 'var programs' },
		],
		module: {
			loaders: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: 'babel',
				},
				{
					test: /\.json$/,
					loader: 'json',
				},
				{
					test: /\.scss$/,
					loader: ExtractTextPlugin.extract(
						'style',
						[
							'css?importLoaders=2&localIdentName=css-module-[hash:base64]',
							'postcss',
							'sass',
						]
					),
				},
				{
					test: /\.(gif|png|jpe?g|svg|ico)$/i,
					loaders: [
						'url?limit=1400&name=s/i/[sha512:hash:base64:16].[ext]',
						'image-webpack?bypassOnDebug',
					],
				},
				{
					test: /isotope\-|fizzy\-ui\-utils|desandro\-|masonry|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
					loader: 'imports?define=>false&this=>window',
				},
				{
					test: /flickity/,
					loader: 'imports?define=>false&this=>window',
				},
				{
					test: /node_modules\/unipointer/,
					loader: 'imports?define=>undefined',
				},
			],
		},
		postcss: () => {
			return [rucksack, autoprefixer, cssnano];
		},
	},

	// Server assets
	{
		entry: { assets: PATHS.serverAssetsSource },
		target: 'node',
		output: {
			path: PATHS.browserBuild,
			libraryTarget: 'commonjs',
			filename: '../serverAssets/index.js',
			publicPath: '/',
		},
		plugins: [
			// assetsWriter,
			new CompressionPlugin({
				asset: '{file}.gz',
				algorithm: 'gzip',
				regExp: /\.js$|\.html$|\.css$|\.svg$|\.eot$|\.xml$/,
				threshold: 1400,
				minRation: 0.8,
			}),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('production'),
					WEBPACK_ENV: JSON.stringify('assets'),
					APP_ENV: (process.env.APP_ENV && JSON.stringify(process.env.APP_ENV)) || undefined,
				},
			}),
		].concat(sharedPlugins),
		module: {
			loaders: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: 'babel',
				},
				{
					test: /\.json$/,
					loader: 'json',
				},
				{
					test: /\.(gif|png|jpe?g|svg|ico)$/i,
					loaders: [
						'url?limit=1400&name=s/i/[sha512:hash:base64:16].[ext]',
						'image-webpack?bypassOnDebug',
					],
				},
			],
		},
	},

	// Server
	{
		entry: PATHS.serverSource,
		target: 'node',
		output: {
			path: PATHS.build,
			libraryTarget: 'commonjs',
			filename: 'server/server.js',
			publicPath: '/s/',
			sourceMapFilename: 'sourcemaps/browser/[file].map',
		},
		externals: [
			{ serverAssets: '../serverAssets/index.js' },
			{ browserAssets: '../browserAssets/index.js' },
			{ vrtConfig: '../../env_vars.js' },
			/^(?!\.|\/).+/i,
			/webpack-assets\.json/,
		],
		plugins: [
			new CleanPlugin(PATHS.serverBuild),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('production'),
					WEBPACK_ENV: JSON.stringify('server'),
					APP_ENV: (process.env.APP_ENV && JSON.stringify(process.env.APP_ENV)) || undefined,
				},
			}),
		].concat(sharedServerPlugins),
		node: {
			__dirname: false,
			__filename: false,
		},
		module: {
			loaders: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: 'babel',
				},
				{
					test: /\.json$/,
					loader: 'json',
				},
			],
		},
	},
];