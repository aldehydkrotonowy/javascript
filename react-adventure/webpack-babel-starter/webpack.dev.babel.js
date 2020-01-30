import merge from 'webpack-merge';
import webpack from 'webpack';
import common from './webpack.common.babel.js';
import path from 'path';


const dev = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  watch: true,
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
    },
    open: true,
    overlay: {
        warnings: true,
        errors: true
    },
    port: 8080,
    publicPath: 'http://localhost:8080/',
    hot: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {loader: 'style-loader'}, // <style></style>
          {loader: 'css-loader'}, // translates CSS into CommonJS
          {loader: 'sass-loader'} // SASS -> CSS; node-sass as dependency
        ]
      }
    ]
  },
})


export default dev