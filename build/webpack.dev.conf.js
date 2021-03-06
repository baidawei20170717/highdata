var utils = require('./utils')
var glob = require('glob')
var path = require('path')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    //https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
// function getEntry(globPath) {
//   var entries = {},
//     basename, tmp, pathname;

//   glob.sync(globPath).forEach(function (entry) {
//     basename = path.basename(entry, path.extname(entry));
//     tmp = entry.split('/').splice(-3);
//     pathname = tmp.splice(1, 1) + '/' + basename; // 正确输出js和html的路径
//     entries[pathname] = entry;
//     console.log('aaa:' + pathname);
//   });
//   return entries;
// }

// var pages = utils.getEntry('./src/module/**/*.html');

// for (var pathname in pages) {
//   // 配置生成的html文件，定义路径等
//   var conf = {
//     filename: pages[pathname].replace('./src/',''),
//     //filename: pathname + '.html',
//     template: pages[pathname],   // 模板路径
//     inject: true,              // js插入位置
//     minify: {
//       //removeComments: true,
//       //collapseWhitespace: true,
//       //removeAttributeQuotes: true
//     },
//     // necessary to consistently work with multiple chunks via CommonsChunkPlugin
//     chunksSortMode: 'dependency'
//   };
//   console.log(module.exports.entry);
//   console.log(pathname);
//   if (pathname in module.exports.entry) {
//     // console.log('找到了');
//     conf.chunks = ['manifest', 'vendor', pathname];
//     conf.hash = true;
//   }

//   module.exports.plugins.push(new HtmlWebpackPlugin(conf));
// }
