// Karma configuration
// Generated on Thu Sep 29 2016 15:34:07 GMT+0100 (BST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      //Libs

      //Ionic/Angular
      'www/lib/ionic/js/ionic.bundle.js',
      'www/lib/ionic/css/ionic.css',
      'www/lib/ionic-platform-web-client/dist/ionic.io.bundle.min.js',

      //Cordova
      'www/lib/ngCordova/ng-cordova.min.js',
      'www/lib/ng-cordova-oauth/ng-cordova-oauth.min.js',
      'www/lib/ngstorage/ngStorage.min.js',

      'www/css/style.css',

      //sha1
      'www/lib/sha1/sha1.js',

      //Mocks
      'bower_components/angular-mocks/angular-mocks.js',

      //App Code
      'www/js/controllers/controllers.js',
      'www/js/services/services.js',
      'www/js/**/*.js',
      'www/*.html',
      'www/templates/*.html',

      //Tests
      'tests/unit/**/*.test.js'
    ],


    // list of files to exclude
    exclude: [
    ],

    plugins : [
      'karma-ng-html2js-preprocessor',
      'karma-coverage',
      'karma-jshint-preprocessor',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher'
    ],

    ngHtml2JsPreprocessor: {
      //stripPrefix: '',
      //stripSufix: '.ext',

      // setting this option will create only a single module that contains templates
      // from all the files, so you can load them all with module('foo')
      moduleName: 'GFFTemplates'
    },

    jshintPreprocessor: {
      jshintrc: 'tests/.jshintrc'
    },


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors : {
      'www/js/**/*.js': ['coverage','jshint'],
      'www/templates/*.html': ['ng-html2js','coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters : ['progress','coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],
    //browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
