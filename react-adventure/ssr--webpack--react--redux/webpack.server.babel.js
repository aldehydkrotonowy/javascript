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


const serverConfig = {
    devtool: '',
    watch: false,
    mode: 'production',
    target: 'node',
    watch: true,
    externals: [nodeExternals()],
    node: {
        //in order to make webpack disable __dirname/__filename injection
        __dirname: false,
        __filename: false
      },
    entry: {
        server: `${SERVER_DIR}/index.js`
    },
    output: {
        path: path.resolve(BUILD_DIR),
        filename: 'server.js',
        publicPath: '/',
        libraryTarget: 'commonjs2'
      },
    resolve: {
        alias: {
            styleutils:     path.resolve(__dirname, 'src/app/stylesheets/utils'),
            images:         path.resolve(__dirname, 'src/app/assets/images'),
            components:     path.resolve(__dirname, 'src/app/components/'),
            containers:     path.resolve(__dirname, 'src/app/containers/'),
            breakpoints:    path.resolve(__dirname, 'src/app/breakpoints/'),
            hoc:            path.resolve(__dirname, 'src/app/hoc/'),
            routes:         path.resolve(__dirname, 'src/app/routes'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react']
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000,
                            name: 'images/[name].[hash:7].[ext]',
                            emitFile: false
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/',
                    emitFile: false
                }
            },
            {
                test: /\.(webm|mp4)$/,
                exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.scss$/, /\.(png|jpe?g|gif|svg)$/],
                loader: 'file-loader',
                options: {
                    name: 'videos/[name].[hash:7].[ext]',
                    emitFile: false
                }
            },
            {
                test: /\.s?[ac]ss$/,
                use: [
                    {
                        loader: 'css-loader/locals',// translates CSS into CommonJS
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[hash:base64:5]'
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
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
          }),
          new CleanWebpackPlugin(['build/*.js'], {
            root: __dirname,            
            verbose: true,
          })
    ]
}


export default serverConfig