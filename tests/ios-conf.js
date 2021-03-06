var appLocation = '/Path/to/Give\ For\ Free/platforms/ios/build/emulator/Give\ For\ Free.app';

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
        //'appium-version': '1.5.3',
        'appium-version': '1.6.0-beta2',
        automationName: 'XCUITest',
        platformName: 'iOS',
        platformVersion: '10.0',
        deviceName: 'iPhone 7 Plus',
        browserName: "",
        autoWebview: true,
        fullReset: true,
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

        //Use http://
        //browser.resetUrl = 'http://';

        //To navigate using file:// rather than http://
        var defer = protractor.promise.defer();

        browser.ignoreSynchronization = true;//To stop Angular not found error

        /*function getAngularVersion() {
            return window.angular.version.full;
        }

        browser.executeScript(getAngularVersion).then(function (version) {
            console.log(version);
            defer.fulfill();
        });*/

        /*function getWindowLocation(){
            return window.location;
        }*/

        //browser.webdriver.executeScript( getWindowLocation ).then( function(location){
        browser.executeScript( 'return window.location;' ).then( function(location){
            console.log('io-conf.js: ' + JSON.stringify(location) );
            browser.resetUrl = 'file://';
            browser.baseUrl = location.origin + location.pathname;
            defer.fulfill();
        });

        return defer.promise;
    }
};
