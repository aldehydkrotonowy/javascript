const Path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ExtractSASS = new ExtractTextPlugin('style.css');
const prefixImgWithTemplPath = require('./webpack-php-processor.js');
const processImgs = require('./webpack-img-processor.js');

module.exports = (options) => {
    const dest = Path.join(__dirname, 'dist');
    const partialsDst = Path.join(__dirname, '../partials-webpack/');
    const wpThemeImages = Path.join(__dirname, '../img');

    let webpackConfig = {
        devtool: options.devtool,
        entry: [
            './src/scripts/index'
        ],
        output: {
            path: dest,
            filename: 'main.js'
        },
        plugins: [
            new Webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(options.isProduction ? 'production' : 'development')
                }
            }),
            new Webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                'window.jQuery': 'jquery'
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                minify: options.isProduction && {
                    collapseWhitespace: false,
                    conservativeCollapse: false,
                    decodeEntities: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: true
                }
            }),
            new CopyWebpackPlugin([
                {from: 'src/styles/img/', to: wpThemeImages, transform: processImgs},
                {from: 'src/styles/img', to: 'img', transform: processImgs},
                {from: 'src/partials/',
                    to: `${partialsDst}[path][name].php`,
                    transform: prefixImgWithTemplPath,
                    toType: 'template'}
            ])
        ],
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-2']
                    }
                }
            },
            {
                test: /\.(eot|ttf|svg|woff|woff2|png|jp(e*)g|gif)$/,
                use: {
                    loader: 'file-loader'
                }
            }, {
                test: /\.html$/,
                exclude: Path.resolve(__dirname, "src/index.html"), // so require will use default loadash parser by HtmlWebpackPlugin
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        removeComments: false,
                        collapseWhitespace: false
                    }
                }],
            }]

        }
    };

    if (options.isProduction) {
        webpackConfig.entry = ['./src/scripts/index'];

        webpackConfig.plugins.push(
            new Webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false
                }
            }),
            ExtractSASS
        );

        webpackConfig.module.rules.push({
            test: /\.s?css/i,
            use: ExtractSASS.extract(['css-loader?sourceMap=true&minimize=true', 'sass-loader'])
        });

    } else {
        webpackConfig.plugins.push(
            new Webpack.HotModuleReplacementPlugin()
        );

        webpackConfig.module.rules.push({
            test: /\.s?css$/i,
            use: ['style-loader', 'css-loader?sourceMap=true', 'sass-loader']
        }, {
            test: /\.js$/,
            use: 'eslint-loader',
            exclude: /node_modules/
        });

        webpackConfig.devServer = {
            contentBase: dest,
            hot: true,
            port: options.port,
            inline: true
        };
    }

    return webpackConfig;

};
