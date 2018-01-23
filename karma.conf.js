module.exports = function (config) {
  'use strict';

  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: [
      'specs/draggable.spec.js'
    ],

    exclude: [
    ],

    preprocessors: {
      'specs/draggable.spec.js': ['webpack']
    },

    webpack: {
      cache: true,
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['babel-preset-env','react']
              }
            }
          }
        ]
      }
    },

    webpackServer: {
      stats: {
        colors: true
      }
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['Chrome'],

    singleRun: true,

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-webpack')
    ]
  });
};
