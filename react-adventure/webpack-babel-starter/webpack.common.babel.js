import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';


const APP_DIR = path.resolve(__dirname, 'src');
const STATIC = path.resolve(__dirname, 'static');
const BUILD_DIR = path.resolve(__dirname, 'build');

const common = {
  entry : {
    app: `${APP_DIR}/app.js`,
    // about: `${APP_DIR}/about.js`,
    // home: `${APP_DIR}/home.js`,
    // error: `${APP_DIR}/404.js`
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.js'
  },
  optimization: {
    splitChunks: {
        cacheGroups: {
          // default: {
          //   minChunks: 2,
          //   priority: -20,
          //   reuseExistingChunk: true,
          // },
          vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              enforce: true,
              chunks: 'all'
          }
        }
    }
  },
  resolve: {
    alias: {
        handlebars: 'handlebars/dist/handlebars.min.js',
    }
  },
  module:{
    rules:[
      {
        test: /\.handlebars$/,
        loader: 'text-loader',
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
            limit: 10000,
            name: 'images/[name].[hash:7].[ext]'
        }
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
        loader: 'file-loader',
        options: {
            name: 'videos/[name].[hash:7].[ext]'
        }
    },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: 'popper.js',
    }),
    new HtmlWebpackPlugin({
      // template: './node_modules/html-webpack-template/index.ejs',
      template: path.resolve(__dirname, 'src', 'html', 'index.ejs'),
      title: 'Webpack 4 Demo - spa',
      favicon: './src/favicon.ico',
      meta: [{ name: 'robots', content: 'noindex,nofollow' }],
      appMountIds: ['app'],
      inject: "body",
      minify: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          preserveLineBreaks: true,
          useShortDoctype: true,
          html5: true
      },
      mobile: true,
      // scripts: ['./static/script.js']
    }),
    new CopyWebpackPlugin([
      {from: path.join(APP_DIR, 'favicon.ico'), to: path.join(BUILD_DIR, 'favicon.ico')}
    ])
  ]
}

export default common