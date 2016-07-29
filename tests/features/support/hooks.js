var hooks = function () {

    this.Before( {tags: ["@requiresLogin"]}, function( scenario, callback ){
        //http://
        //browser.ignoreSynchronization = true;
        //browser.get('/index.html#/login');
        //browser.ignoreSynchronization = false;

        //file://
        //browser.ignoreSynchronization = true;
        browser.get( '#/login' );
        //browser.ignoreSynchronization = false;

        var email = element( by.id('loginFormEmail') );
        email.sendKeys('test@test.com');

        var password = element( by.id('loginFormPassword') );
        password.sendKeys('password');

        var loginButton = element( by.id('loginFormLogInButton') );
        loginButton.click();

        //browser.waitForAngular();

        /*browser.wait( function(){
            browser.getLocationAbsUrl().then( function(url){
                console.log(url);
            });
            element( by.id('headerText') ).isPresent().then( function(present){
                console.log(present);
            });
            element( by.id('headerText') ).getText().then( function(text){
                console.log(text);
            });
        }, 30 * 1000);*/
        //this.expect( browser.getLocationAbsUrl() ).to.eventually.not.equal('/login').and.notify(callback(new Error('Ahhh! login screen')));

        browser.driver.sleep(5 * 1000);

        this.expect( browser.getLocationAbsUrl() ).to.eventually.equal('/tab/home').and.notify(callback);
    });

    this.After( {tags: ["@requiresLogout"]}, function( scenario, callback ){
        //http://
        //browser.ignoreSynchronization = true;
        //browser.get('/index.html#/tab/home');
        //browser.ignoreSynchronization = false;

        //file://
        //browser.ignoreSynchronization = true;
        browser.get( '#/tab/home' );
        //browser.ignoreSynchronization = false;

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
};

module.exports = hooks;