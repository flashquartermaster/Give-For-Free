var appLocation = '/Path/to/Give\ For\ Free/platforms/android/build/outputs/apk/android-debug.apk';

exports.config = {
    seleniumAddress: 'http://localhost:4723/wd/hub',

    /*jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true,
        includeStackTrace: true
    },*/

    specs: [
        'features/*.feature'
    ],

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        require: ['features/step_definitions/*_steps.js', 'features/support/*.js'],
        format: 'pretty'
        //,tags: '@dev'
    },

    // Reference: https://github.com/appium/sample-code/blob/master/sample-code/examples/node/helpers/caps.js
    capabilities: {
        'appium-version': '1.6.0-beta2',
        platformName: 'Android',
        platformVersion: '6.0',
        deviceName: '192.168.57.101:5555',
        browserName: '',
        //autoWebview: true,
        //fullReset: true,
        app: appLocation
    },
    //baseUrl: 'http://10.0.2.2:8000',
    baseUrl: '',

    // configuring wd in onPrepare
    // wdBridge helps to bridge wd driver with other selenium clients
    // See https://github.com/sebv/wd-bridge/blob/master/README.md
    onPrepare: function () {
        var wd = require('wd'),
            protractor = require('protractor'),
            wdBridge = require('wd-bridge')(protractor, wd);

        wdBridge.initFromProtractor(exports.config);

        //To navigate using file:// rather than http://
        var defer = protractor.promise.defer();

         browser.executeScript('return window.location;').then( function(location){
             browser.resetUrl = 'file://';
             browser.baseUrl = location.origin + location.pathname;
             defer.fulfill();
         });

         return defer.promise;
    }
};
