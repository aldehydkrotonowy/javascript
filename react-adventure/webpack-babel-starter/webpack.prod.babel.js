import merge from 'webpack-merge';
import common from './webpack.common.babel';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const prod = merge(common, {
  devtool: '',
  mode: 'production',
  watch: false,
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
          // Rules for SCSS files. Loaders run in reverse order
          test: /\.(scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }
          ],
      }
    ]
  },
})

export default prod