const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const commonConfig = require('./wenpack.common.config');

const devConfig = {
  devtool:'inline-source-map',
  entry:{
    app:[
      'babel-polyfill',
      'react-hot-loader/patch',
      path.join(__dirname,'../src/index.js')
    ]
  },
  output:{
    /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
    filename:'[name].[hash].js'
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader?module&localIdentName=[local]-[hash:base64:5]','postcss-loader']
      }
    ]
  },
  devServer:{
    contentBase:path.join(__dirname,'../dist'),
    historyApiFallback:true,
    host:'0.0.0.0',
    proxy:{
      "/api/*":"http://localhost:8090/$1"
    }
  }
};

module.exports = merge({
  customizeArray(a,b,key){
    /*entry.app不合并，全替换*/
    if(key==="entry.app"){
      return b;
    }
    return undefined
  }
})(commonConfig,devConfig)
