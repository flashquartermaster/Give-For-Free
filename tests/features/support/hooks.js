var hooks = function () {

    this.Before( {tags: ["@requiresLogin"]}, function( scenario, callback ){
        browser.get( '#/login' );

        var email = element( by.id('loginFormEmail') );
        email.sendKeys('test@test.com');

        var password = element( by.id('loginFormPassword') );
        password.sendKeys('password');

        var loginButton = element( by.id('loginFormLogInButton') );
        loginButton.click();

        browser.driver.sleep(5 * 1000);

        this.expect( browser.getLocationAbsUrl() ).to.eventually.equal('/tab/home').and.notify(callback);
    });

    this.After( {tags: ["@requiresLogout"]}, function( scenario, callback ){
        browser.get( '#/tab/home' );

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

module.exports = hooks;