var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpackHot.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  debug: true,
  historyApiFallback: true
}).listen(3002, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3002');
});
