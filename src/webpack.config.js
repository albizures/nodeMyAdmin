const webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path');

module.exports = function (config) {
  return {
    devtool : '#inline-source-map',
    entry:[
      'webpack-hot-middleware/client?reload=true',
      config.APP_CLIENT_PATH
    ],
    output: {
      path: config.PUBLIC_PATH,
      filename: "[name].js",
      publicPath : '/'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: 'nodeMyAdmin',
        filename: 'index.html',
        template: config.MAIN_TEMPLATE
      })
    ],

    // Transform source code using Babel and React Hot Loader
    module: {
      loaders: [{
        test: /\.js$/,
        include: config.CLIENT_PATH,
        loaders: ['react-hot', 'babel']
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?name=assets/images/[name].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }, {
        test: /\.jade$/,
        loader: 'jade'
      }, {
        test: /\.css?$/,
        loaders: ['style', 'css']
      }, {
        test: /\.styl?$/,
        loaders: ['style', 'css', 'stylus']
      },],
      preLoaders: [{
        test: /\.js?$/,
        exclude: [/build/, /node_modules/],
        loaders: ['eslint']
      }]
    },
    // Automatically transform files with these extensions
    resolve: {
      alias: {
        //inheritanceObject : path.join(config.CLIENT_PATH, '/utils/inheritanceObject.js'),
        //make : path.join(config.CLIENT_PATH, '/utils/make.js')
      },
      extensions: ['', '.js', '.css', '.styl', '.jade']
    },
    resolveLoader: {
      root: config.MODULES_PATH
    }
  };
};
