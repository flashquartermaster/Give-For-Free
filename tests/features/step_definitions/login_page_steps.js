module.exports = function () {

    this.World = require("../support/world.js").World;

    this.Given(/^I am on the login page$/, function(callback) {
        //ENSURE YOU ARE LOGGED OUT BEFORE THIS RUNS
        // //or urlrouter will send you to /tab/home
        browser.get('#/login');

        this.expect( browser.getLocationAbsUrl() ).to.eventually.equal('/login').and.notify(callback);
    });

    this.When(/^I enter the correct details$/, function(callback) {
        var email = element( by.id('loginFormEmail') );
        email.sendKeys('test@test.com');

        var password = element( by.id('loginFormPassword') );
        password.sendKeys('password');

        /*
         //var toggle = element( by.id('loginFormRememberToggle') );
         var toggle = element.all( by.model('data.remember') ).filter(function(elem, index) {
         return elem.getAttribute('id').then(function(text) {
         return text === 'loginFormRememberToggle';
         });
         }).first();

         toggle.getInnerHtml().then( function(html){
         console.log(html);
         });

         var checkBox = element( toggle.findElement( by.tagName('input') ) );
         checkBox.click();
         */

        var loginButton = element( by.id('loginFormLogInButton') );
        loginButton.click();

        browser.driver.sleep(5 * 1000);

        callback();
    });

    this.Then(/^I successfully log in$/, function(callback){
        this.expect( browser.getLocationAbsUrl() ).to.eventually.equal('/tab/home').and.notify(callback);
    });

    this.Then(/^I can sign out again$/, function(callback){

        this.expect( browser.getLocationAbsUrl() ).to.eventually.equal('/tab/home');

        var signOutButton = element( by.id('signOutButton') );
        signOutButton.click();

        this.expect( browser.getLocationAbsUrl() ).to.eventually.equal('/login');

        browser.executeScript('window.localStorage.clear();').then( function(){
            browser.driver.navigate().refresh().then( function(){
                callback();
            });
        });
    });
};