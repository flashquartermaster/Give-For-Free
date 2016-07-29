module.exports = function () {

    this.World = require("../support/world.js").World;

    this.Given(/^I load the app$/, function(callback) {
        //http://
        //browser.ignoreSynchronization = true;
        //browser.get('/index.html#/tab/home');
        //browser.ignoreSynchronization = false;

        //file://
        browser.get( '' );

        callback();
    });

    this.Then(/^I should see the login screen$/, function (callback) {
        this.expect( browser.getLocationAbsUrl() ).to.eventually.equal('/login').and.notify(callback);
    });
};
