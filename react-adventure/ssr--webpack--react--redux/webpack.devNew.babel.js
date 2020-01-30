import webpack from 'webpack';
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const BROWSER_DIR = path.resolve(__dirname, 'src', 'browser');
const SERVER_DIR = path.resolve(__dirname, 'src', 'server');
const BUILD_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');
const APP_DIR = path.resolve(__dirname, 'src', 'app');


const config = {
    context: path.resolve(__dirname, '.'),
    devtool: 'inline-source-map',
    mode: 'development',
    target: 'web', //default
    entry: {
        app: `${BROWSER_DIR}/index.js`
    },
    output: {
        path: path.resolve(BUILD_DIR, 'public'),
        filename: '[name].js',
        // publicPath: path.resolve(BUILD_DIR, 'public')
    },
    devServer: {
        contentBase: path.resolve(BUILD_DIR, 'public'),
        compress: true,
        headers: {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            "Access-Control-Allow-Origin": "http://localhost:3000",
        },
        open: true,
        overlay: {
            warnings: true,
            errors: true
        },
        port: 7070,
        historyApiFallback: true,//will redirect 404s to /index.html
        publicPath: 'http://localhost:7070/',
        hot: true
    },
    resolve: {
        alias: {
            styleutils:     path.resolve(__dirname, 'src/app/stylesheets/utils'),
            images:         path.resolve(__dirname, 'src/app/assets/images'),
            components:     path.resolve(__dirname, 'src/app/components/'),
            containers:     path.resolve(__dirname, 'src/app/containers/'),
            breakpoints:    path.resolve(__dirname, 'src/app/breakpoints/'),
            hoc:            path.resolve(__dirname, 'src/app/hoc/'),
            aux:            path.resolve(__dirname, 'src/app/hoc/ReactAux'),
            routes:         path.resolve(__dirname, 'src/app/routes'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 500000,
                            name: 'images/[name].[hash:7].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(webm|mp4)$/,
                exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.scss$/],
                loader: 'file-loader',
                options: {
                    name: 'videos/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.s?[ac]ss$/,
                use: [
                    {
                        loader: 'style-loader' // <style></style> // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader',// translates CSS into CommonJS
                        options: {
                            // url:false,
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[path][name]__[local]--[hash:base64:8]'
                        }
                    }, 
                    {
                      loader: 'sass-loader'// SASS -> CSS; node-sass as dependency
                    } 
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {loader: 'style-loader'},//Adds CSS to the DOM by injecting a <style> tag
                    {loader: 'css-loader', options: {importLoader: 1}},//interprets @import and url() like import/require() and will resolve them.
                    {loader: 'postcss-loader'}
                ]
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: 'index.html',
            title: 'Test development webpacka',
            favicon: path.resolve(__dirname, 'src', 'favicon.ico'),
            appMountIds: ['root'],
            meta: [{ name: 'robots', content: 'noindex,nofollow' }],
            inject: "body"
        }),
        new CleanWebpackPlugin(['build/public/*.js', 'build/public/*.css'], {
            root: __dirname,            
            verbose: true,
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(SRC_DIR, 'favicon.ico'), 
                to: path.join(BUILD_DIR, 'public', 'favicon.ico')
            },
            {
                from: path.join(SRC_DIR, 'app', 'assets', 'fonts', 'OpenSans'), 
                to: path.join(BUILD_DIR, 'public', 'fonts')
            },
            {
                from: path.join(SRC_DIR, 'app', 'assets', 'images'), 
                to: path.join(BUILD_DIR, 'public', 'images')
            }
        ]),
    ]
}




export default config