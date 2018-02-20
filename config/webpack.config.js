const merge = require("webpack-merge");

const webpack = require("webpack");
const UglifyJSPlugins = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const commonConfig = require("./wenpack.common.config");

const publicConfig = {
  devtool:"cheap-module-source-map",
  module:{
    rules:[
      {
        test:/\.css$/,
        use:ExtractTextPlugin.extract({
          fallback:"style-loader",
          use:"css-loader"
        })
      }
    ]
  },
  plugins:[
    new CleanWebpackPlugin(['dist/*.*'],{
      root:__dirname+'/../'
    }),
    new UglifyJSPlugins(),
    new webpack.DefinePlugin({
      'process.env':{
        "NODE_ENV":JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin({
      filename:'[name].[contenthash:5].css',
      allChunks:true
    })
  ]
};

module.exports = merge(commonConfig,publicConfig);