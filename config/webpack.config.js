const path = require('path');

let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); 

module.exports = {
  devtool:'cheap-module-source-map',
  /*入口文件*/
  entry: {
    app:[
      'react-hot-loader/patch',
      path.join(__dirname,'../src/index.js')
    ],
    vendor:['react','react-router-dom','redux','react-dom','react-redux']
  },
  /*输出到dist文件夹，输出文件名字为bundle.js*/
  output:{
    path:path.join(__dirname,'../dist'),
    filename:'[name].[chunkhash].js',
    chunkFilename:'[name].[chunkhash].js'
  },
  /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
  /*cacheDirectory使用来缓存编译结果，下次编译加速*/
  module:{
    rules:[
      {
        test:/\.js$/,
        use:['babel-loader?cacheDirectory=true'],
        include:path.join(__dirname,'../src')
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test:/\.(png|jpg|gif)$/,
        use:[{
          loader:'url-loader',
          options:{
            limit:8192
          }
        }]
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename:'index.html',
      template:path.join(__dirname,'../src/index.html')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name:'runtime'
    }),
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
        'process.env':{
            'NODE_ENV':JSON.stringify('production')
        }
    }),
    new webpack.HashedModuleIdsPlugin()
  ],
  resolve:{
    alias:{
      pages:path.join(__dirname,'../src/pages'),
      component:path.join(__dirname,'../src/component'),
      router:path.join(__dirname,'../src/router'),
      actions:path.join(__dirname,'../src/redux/actions'),
      reducers:path.join(__dirname,'../src/redux/reducers')
    }
  }
}
