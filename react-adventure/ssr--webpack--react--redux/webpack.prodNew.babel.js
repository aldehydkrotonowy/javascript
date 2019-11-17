import webpack from 'webpack';
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin'; //extract CSS into separate files. 
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from'clean-webpack-plugin';


const BROWSER_DIR = path.resolve(__dirname, 'src', 'browser');
const SERVER_DIR = path.resolve(__dirname, 'src', 'server');
const BUILD_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');
const APP_DIR = path.resolve(__dirname, 'src', 'app');


const browserConfig = {
    devtool: '',
    watch: true,
    target: 'web', //default
    entry: {
        app: `${BROWSER_DIR}/index.js`
    },
    output: {
        path: path.resolve(BUILD_DIR, 'public'),
        filename: '[name].js',
        publicPath: path.resolve(BUILD_DIR, 'public')
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
                exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.scss$/, /\.(png|jpe?g|gif|svg)$/],
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
                exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.scss$/, /\.(png|jpe?g|gif|svg)$/],
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: '/fonts/',
                    useRelativePath: true,
                    emitFile: true
                }
            },
            {
                test: /\.(webm|mp4)$/,
                exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.scss$/, /\.(png|jpe?g|gif|svg)$/],
                loader: 'file-loader',
                options: {
                    name: 'videos/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.s?[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',// translates CSS into CommonJS
                        options: {
                            url:false,
                            sourceMap: true,
                            camelCase: true,
                            minimize: true,
                            namedExport: true,
                            modules: true,
                            importLoaders: 2,
                            localIdentName: '[hash:base64:8]',
                        }
                    }, 
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                              require('autoprefixer')(),
                              require('precss')()
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',// SASS -> CSS; node-sass as dependency
                        options: {
                            sourceMap: true
                        }
                    } 
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__ : 'true'
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(SRC_DIR, 'favicon.ico'), 
                to: path.join(BUILD_DIR, 'public', 'favicon.ico')
            },
            {
                from: path.join(SRC_DIR, 'app', 'assets', 'fonts', 'OpenSans'), 
                to: path.join(BUILD_DIR, 'public', 'fonts')
            }
        ]),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "styles.css",
            chunkFilename: "[id].css"
          }),
        new CleanWebpackPlugin(['build/public/*.js', 'build/public/*.css'], {
            root: __dirname,            
            verbose: true,
        })
        //sugestions
        //      new webpack.optimize.DedupePlugin(), //dedupe similar code 
        //      new webpack.optimize.UglifyJsPlugin(), //minify everything
        //      new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
    ]
}

export default browserConfig