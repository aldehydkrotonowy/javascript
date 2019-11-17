import webpack from 'webpack';
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';


const PATH = {
	browserSource: path.resolve(__dirname, 'src', 'browser', 'browser.tsx'),
	assetsSource: path.resolve(__dirname, 'src', 'assets'),
	serverSource: path.resolve(__dirname, 'src', 'server', 'server.tsx'),
	browserBuild: path.resolve(__dirname, 'build', 'browser'),
	assetsBuild: path.resolve(__dirname, 'build', 'browser', 'assets'),
	serverBuild: path.resolve(__dirname, 'build', 'server')
}
console.log('process.cwd()', process.cwd());
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('__dirname', __dirname);
const commonModules = [
	{
		test: /\.(js|jsx)$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env']
			}
		}
	}
]

const browser = {
	context: path.resolve(__dirname, '.'),
	devtool: 'source-map',
	target: 'web', //default
	externals: [nodeExternals()],
	entry: {
		browser: PATH.browserSource
	},
	output: {
		path: PATH.browserBuild,
		filename: '[name].js',
		// publicPath: path.resolve(BUILD_DIR, 'public')
	},
	resolve: {
		alias: {
			// styleutils: path.resolve(__dirname, 'src/app/stylesheets/utils'),
			images: path.resolve(__dirname, 'src/assets/images'),
			components: path.resolve(__dirname, 'src/app/components/'),
			containers: path.resolve(__dirname, 'src/app/containers/'),
			// breakpoints: path.resolve(__dirname, 'src/app/breakpoints/'),
			// hoc: path.resolve(__dirname, 'src/app/hoc/'),
			// routes: path.resolve(__dirname, 'src/app/routes'),
		},
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		modules: ["node_modules", path.resolve(__dirname, "src")],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'file-loader',
						options: {
							// limit: 10,
							name: 'assets/images/[name].[ext]',
							publicPath: url => url//.replace("assets", ""),
						}
					}
				]
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 1000,
					name: 'assets/fonts/[name].[hash:7].[ext]',
					publicPath: url => url//.replace("assets", ""),
				}
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin()
	]
};

const assets = {};

const server = {
	entry: PATH.serverSource,
	target: 'node',
	output: {
		path: PATH.serverBuild,
		libraryTarget: 'commonjs2',
		filename: 'server.js',
		// publicPath: 'http://localhost:3000',
		sourceMapFilename: 'sourcemaps/browser/[file].map',
	},
	node: {
		//in order to make webpack disable __dirname/__filename injection
		__dirname: false,
		__filename: false
	},
	resolve: {
		alias: {
			// styleutils: path.resolve(__dirname, 'src/app/stylesheets/utils'),
			images: path.resolve(__dirname, 'src/assets/images'),
			components: path.resolve(__dirname, 'src/app/components/'),
			containers: path.resolve(__dirname, 'src/app/containers/'),
			// breakpoints: path.resolve(__dirname, 'src/app/breakpoints/'),
			// hoc: path.resolve(__dirname, 'src/app/hoc/'),
			// routes: path.resolve(__dirname, 'src/app/routes'),
		},
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		modules: ["node_modules", path.resolve(__dirname, "src")],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'assets/images/[name].[ext]',
							publicPath: url => url,//.replace("assets", ""),
							emit: false
						}
					}
				]
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					emit: false,
					limit: 1000,
					name: 'assets/fonts/[name].[hash:7].[ext]',
					publicPath: url => url//.replace("assets", ""),
				}
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin()
	]
};

export default [browser, server]

