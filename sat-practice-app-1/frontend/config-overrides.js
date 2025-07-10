const webpack = require('webpack');

module.exports = function override(config, env) {
  // Webpack 4 compatible configuration
  config.resolve.alias = {
    ...config.resolve.alias,
    "process": "process/browser",
    "buffer": "buffer",
    "stream": "stream-browserify",
    "util": "util"
  };
  
  // Webpack 4 node configuration
  config.node = {
    ...config.node,
    process: false,
    buffer: false,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  };
  
  // Provide global variables
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ];

  return config;
};
