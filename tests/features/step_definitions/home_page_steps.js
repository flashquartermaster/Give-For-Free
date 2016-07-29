module.exports = function () {

    this.World = require("../support/world.js").World;

    //Uses @requiresLogin tagged Before hook that brings us to the home page
    this.Given(/^I am on the home page$/, function( callback ){
        //file://
        //browser.ignoreSynchronization = true;
        browser.get( '#/tab.home' );
        //browser.ignoreSynchronization = false;

        //browser.waitForAngular();

        this.expect( browser.getLocationAbsUrl() ).to.eventually.equal('/tab/home').and.notify(callback);
    });

    this.Then(/^I am greeted$/, function(callback) {
        this.expect( element( by.id('headerText') ).isPresent() ).to.eventually.equal(true);
        this.expect( element( by.id('headerText') ).getText() ).to.eventually.have.string('Welcome Test').and.notify(callback);
    });

    this.Then(/^told some information about the app$/, function(callback){
        this.expect( element( by.id('bodyText') ).isPresent() ).to.eventually.equal(true).and.notify(callback);
    });

    this.Then(/^I can link to the app's website$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });

    this.Then(/^I can link to the app's facebook$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });

    this.Then(/^I can link to the app's twitter$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });

    this.Then(/^I can request email support$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });

    this.Then(/^I can see a sign out button$/, function (callback) {
        this.expect( element( by.id('signOutButton') ).isPresent() ).to.eventually.equal(true).and.notify(callback);
    });

    this.Then(/^can sign out of the app$/, function (callback) {
        var signOutButton = element( by.id('signOutButton') );
        signOutButton.click();

        //browser.waitForAngular();

        this.expect( browser.getLocationAbsUrl() ).to.eventually.equal('/login');

        browser.executeScript('window.localStorage.clear();').then( function(){
            browser.driver.navigate().refresh().then( function(){
                callback();
            });
        });
    });

    this.Then(/^I can navigate to the charities list$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });

    this.Then(/^I can navigate to the settings page$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });
};