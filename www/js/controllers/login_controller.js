controllers.controller('LoginCtrl', function($scope, $ionicHistory, $state, $ionicLoading, $openFB, Settings, Charities, EVENTS) {
  $scope.data = {};
  $scope.isLogin = true;
  $scope.isSignUp = false;
  $scope.isForgotPassword = false;
  $scope.message = '';
  $scope.isCurrentUser = false;
  $scope.firstname = '';
  $scope.forgotPassword = false;

  function onBeforeEnter(){
    //check if we are logged in and navigate accordingly
    //console.log('<GFF> LoginCtrl: User: ' + JSON.stringify(Ionic.User.current()) );
    console.log('<GFF> LoginCtrl: User is Logged In: ' + Ionic.User.current().isAuthenticated());

    if( Ionic.User.current().isAuthenticated() )
    {
      $ionicHistory.nextViewOptions({
         disableAnimate: true
      });
      $state.go('tab.home');
    } else {
      setLoginHeader();
      setForgotPassword();
      $scope.data.remember = false;
    }
  }

  $scope.$on('$ionicView.beforeEnter', onBeforeEnter );

  function setLoginHeader(){
    var user = Ionic.User.current();
    if( !user._fresh ){
      $scope.isCurrentUser = true;
      $scope.firstname = user.details.name.split(" ")[0];
      $scope.data.email = user.details.email;
    }
  }

  function setForgotPassword(){
    var user = Ionic.User.current();
    if( !user._fresh ){
      $scope.forgotPassword = true;
    }
  }

  $scope.showLogin = function(){
    setLoginHeader();
    $scope.isLogin = true;
    $scope.isSignUp = false;
    $scope.isForgotPassword = false;
    $scope.message = '';
  }

  $scope.showCreateAccount = function(){
    $scope.isCurrentUser = false;
    $scope.isLogin = false;
    $scope.isSignUp = true;
    $scope.isForgotPassword = false;
    $scope.message = '';
  }

  $scope.showForgotPassword = function(){
    $scope.isCurrentUser = false;
    $scope.isLogin = false;
    $scope.isSignUp = false;
    $scope.isForgotPassword = true;
    $scope.message = '';
  }

  $scope.clearErrorMessage = function(){
    $scope.message = '';
  }

  //Login functions
  function loginSettings(){
    return {remember: $scope.data.remember};
  }

  function loginDetails(){
    return {
      email: $scope.data.email,
      password: $scope.data.password
    };
  }

  function loginSuccess( user ){
    //console.log('<GFF> LoginCtrl: loginSuccess: login user: ' + JSON.stringify( user.get('settings') ) );
    //console.log('<GFF> LoginCtrl: loginSuccess: localstorage user: ' + JSON.stringify( Ionic.User.current().get('settings') ) );
    $ionicLoading.hide();
    $state.go('tab.home');
  }

  function loginFailure( errors ){
    console.log('<GFF> LoginCtrl: loginFailure: ' + JSON.stringify(errors) );
    /*
    {"response":{
      "seq_id":1,"id":"1: POST https://api.ionic.io/auth/login","_id":"1: POST https://api.ionic.io/auth/login","timeoutTimer":128,"statusCode":422,
      "body":{
        "meta":{"status":422,"version":"2.0.0-beta.0","request_id":"20d34f79-34df-4668-817a-73906870e47e"},
        "error":{"type":"UnprocessableEntity","link":null,
        "details":[{"errors":["Missing data for required field."],"error_type":"required","parameter":"password"},{"errors":["Missing data for required field."],"error_type":"required","parameter":"email"}],
        "message":"An error occurred while validating the request parameters."
      }}},"error":{}}
    */

    /*
    {"response":{
      "seq_id":2,"id":"2: POST https://api.ionic.io/auth/login","_id":"2: POST https://api.ionic.io/auth/login","timeoutTimer":161,"statusCode":401,
      "body":{"meta":{"status":401,"version":"2.0.0-beta.0","request_id":"87ec6e93-e614-401c-9ff5-17e67b09325d"},
        "error":{"type":"Unauthorized",
                "link":null,
                "message":"No user could be found with the details provided"
              }}},"error":{}}
    */
    $ionicLoading.hide();

    var errorsArray = errors.response.body.error.details, i, len = errorsArray ? errorsArray.length : 0,
                      errorMessage = formatErrorMessage( errors.response.body.error.message );

    if( len > 0 ){
      for (i = 0; i < len; i++) {
        var error = errorsArray[i];
        errorMessage += formatErrorMessage( error.parameter[0].toUpperCase() + error.parameter.slice(1) + ': ' + error.errors[0] );
      }
    }

    setMessage(errorMessage);
  }

  function setMessage(message){
    $scope.message = message;
    $scope.$apply();//Because variable change is not updating the view
  }

  function formatErrorMessage( message ){
    return '<p class="error-message">' + message + '</p>'
  }

  $scope.doLogin = function(){
    console.log('<GFF> LoginCtrl : doLogin: ' + JSON.stringify($scope.data));
    ionic.trigger(EVENTS.asynchronousUserEvents);
    Ionic.Auth.login('basic', loginSettings(), loginDetails() ).then(loginSuccess, loginFailure);
  }

  function facebookLoginSuccess( newUser ){
    //console.log('<GFF> LoginCtrl: facebookLoginSuccess: ' + JSON.stringify( newUser ) );
    //console.log('<GFF> LoginCtrl: facebookLoginSuccess: ' + JSON.stringify( Ionic.User.current() ) );
    var user = Ionic.User.current();

    function loginSuccess( loginSuccessData ){
      console.log('<GFF> LoginCtrl: facebookLoginSuccess: login: success: ' + JSON.stringify( loginSuccessData ) );
      //"status":"connected",
      //"authResponse":{
      //  "token":"EAAHqaguld0gBAM3n2BePiPZCPk5kiMNswWrGqOjn9C8AWO4nqGwpLfDAycWU2p6bQdLViPb6U2vOEEcyfBCijFXTqetMfIusopK1Kvh8Hu5to1zMcbnBDS0YZB8vrzLC9kwcSLMQXOkgZCtFpSWAdfvGG3m9mIZD"
      //}
      //console.log('<GFF> LoginCtrl: facebookLoginSuccess: login: success: for user: ' + user.details.facebook_id );

      function getApiSuccess( apiSuccess ){
        console.log('<GFF> LoginCtrl: facebookLoginSuccess: api: /me/fields: success: ' + JSON.stringify( apiSuccess ) );

        user.details.name = apiSuccess.name;
        user.details.image = apiSuccess.picture.data.url;
        user.details.email = apiSuccess.email;//cant see this yet in the Ionic User Admin area but storing it anyway
        user.set('email', apiSuccess.email );//make email visible in Ionic User Admin area

        if( user.get('settings') == undefined ){
          //New user will have no settings in custom data
          user.set('settings', Settings.getInitialSettings() );
        }

        if( user.get('charities') == undefined ){
          user.set('charities', Charities.getInitialCharities() );
        }

        function userSaveSuccess( saveSuccess ) {
          console.log('<GFF> LoginCtrl: facebookLoginSuccess: userSaveSuccess: success: ' + JSON.stringify( saveSuccess ) );
          $state.go('tab.home');
        };

        function userSaveFailure( saveError ) {
          console.log('<GFF> LoginCtrl: facebookLoginSuccess: userSaveFailure: error: ' + JSON.stringify( saveError ) );
          //{"response":{
          //  "seq_id":3,
          //  "id":"3: PATCH https://api.ionic.io/auth/users/cbda85d3-5c74-4ff0-9516-10df9ec3821c",
          //  "_id":"3: PATCH https://api.ionic.io/auth/users/cbda85d3-5c74-4ff0-9516-10df9ec3821c",
          //  "timeoutTimer":179,
          //  "statusCode":400,
          //  "body":{
          //    "error":{
          //      "link":null,
          //      "message":"Illegal operator '$$hashKey'","type":"BadRequest"
          //    },"meta":{"status":400,"request_id":"67ec65e7-3e0f-4e6e-8aac-4c781bb55f82","version":"2.0.0-beta.0"}}},"error":{}}
          var errorMessage = formatErrorMessage( saveError.response.body.error.message );
          setMessage(errorMessage);
        };

        user.save().then( userSaveSuccess, userSaveFailure );
      }

      function getApiFailure( apiError ){
        console.log('<GFF> LoginCtrl: facebookLoginSuccess: api: /me/fields: error: ' + JSON.stringify( apiError ) );
        //{"data":{
        //  "error":{
        //    "message":"Unsupported get request. Please read the Graph API documentation at https://developers.facebook.com/docs/graph-api",
        //    "type":"GraphMethodException",
        //    "code":100,"fbtrace_id":"FiYvPL70dNH"
        //  }
        //},"status":400,
        //"config":{"method":"GET","transformRequest":[null],"transformResponse":[null],
        //"url":"https://graph.facebook.com?fields=email%2Cname%2Cpicture&access_token=EAAHqaguld0gBALK0HvhdXZAZA2RJljFvrC80B4KoW1vtYbtYaF66t8hsJkhxwgEIxWzhf6mpBM0136WvZA0gwcFsJ8cIiDslf3pB58J0guhuvq3r0zCCT86ucnSaUivqjL89tpQRclETvA6desD54enrbAOGV0ZD",
        //"headers":{"Accept":"application/json, text/plain, "}},"statusText":"Bad Request"}
        var errorMessage = formatErrorMessage( 'Facebook Error: ' + apiError.data.error.message );
        setMessage(errorMessage);
      }

      $openFB.api({path: '/me',params: {fields: 'email,name,picture'}}).then( getApiSuccess, getApiFailure );
    }

    function loginFailure( loginError ) {
      console.log('<GFF> LoginCtrl: facebookLoginSuccess: login: error: ' + JSON.stringify( loginError ) );
      //{"error":"user_cancelled","error_description":"User cancelled login process","error_reason":"user_cancelled"}
      var errorMessage = formatErrorMessage( 'Login Error: ' + loginError.error_description );
      setMessage(errorMessage);
    }

    $openFB.login({scope: 'public_profile,email,user_friends'}).then( loginSuccess, loginFailure );
  }

  $scope.doFacebookLogin = function(){
    console.log('<GFF> LoginCtrl : doFacebookLogin: ' + JSON.stringify($scope.data));

    $openFB.init({
      appId: '539216159536968',
      cordovaOauthCallback: 'http://api.giveforfreeonline.org/oauthcallback.html'
    });

    Ionic.Auth.login('facebook', {'remember': true}).then(facebookLoginSuccess, loginFailure);

    /*
    //This code is pointless we will never arrive at the point where we are on the login page and
    //the user is logged in using openFB we are only using openFB to retreive data from the graph api
    //after we have logged in with Ionic Auth

    $openFB.isLoggedIn().then(
      function( success ) {
          console.log('<GFF> LoginCtrl: facebookLoginSuccess: isLoggedIn: success: ' + JSON.stringify( success ) );
          $state.go('tab.home');
      },
      function( error ) {
          console.log('<GFF> LoginCtrl: facebookLoginSuccess: isLoggedIn: error: ' + JSON.stringify( error ) );
          if( error.status == 'unknown'){
            Ionic.Auth.login('facebook', {'remember': true}).then(facebookLoginSuccess, loginFailure);
          } else {
            //Dont fail silently
          }
      });
      */
  }

  $scope.doTwitterLogin = function(){
    console.log('<GFF> LoginCtrl : doTwitterLogin: ' + JSON.stringify($scope.data));
    //ionic.trigger(EVENTS.asynchronousUserEvents);

  }

  $scope.doGoogleLogin = function(){
    console.log('<GFF> LoginCtrl : doGoogleLogin: ' + JSON.stringify($scope.data));
    //ionic.trigger(EVENTS.asynchronousUserEvents);
  }

  //Sign Up functions
  function signUpData(){
    return {
      email: $scope.data.email,
      password: $scope.data.password,
      username: $scope.data.email,
      name: $scope.data.firstname + ' ' + $scope.data.lastname,
      custom: {
        settings: Settings.getInitialSettings(),
        charities: Charities.getInitialCharities()
      }
    };
  }

  function signupSuccess( newUser ){
    //Keep the loading icon going
    Ionic.Auth.login('basic', {remember: true}, loginDetails() ).then(loginSuccess, loginFailure);
  }

  function signupFailure( errors ){
    $ionicLoading.hide();

    var i, arr = errors.errors, len = arr.length, errorMessage = '';

    for (i = 0; i < len; i++) {
      console.log('<GFF> LoginCtrl: signupFailure: ' + arr[i]);
      switch (arr[i]) {
        case 'required_email':
          errorMessage += formatErrorMessage( 'You must supply and email address' );
          break;
        case 'required_password':
          errorMessage += formatErrorMessage( 'You must supply a password' );
          break;
        case 'conflict_email':
          errorMessage += formatErrorMessage( 'An account has already been registered with this email' );
          break;
        case 'conflict_username':
          errorMessage += formatErrorMessage( 'This user name is currently in use' );
          break;
        case 'invalid_email':
          errorMessage += formatErrorMessage( 'You must supply a valid email address' );
          break;
        default:
          errorMessage = formatErrorMessage( 'There has been an error signing you up plaese try again. '
          + 'If you continue to experience difficulties plaese contact support@giveforfreeonline.org' );
      }
    }

    setMessage(errorMessage);
  }

  $scope.doSignUp = function(){
    console.log('<GFF> LoginCtrl : doSignUp: ' + JSON.stringify($scope.data));
    ionic.trigger(EVENTS.asynchronousUserEvents);
    Ionic.Auth.signup( signUpData() ).then( signupSuccess, signupFailure );
  }

  //Recover Password
  function recoverPasswordSuccess( response ){
    $ionicLoading.hide();
    var message = '<p class="message">An email has been sent to ' + Ionic.User.current().details.email + ' with a new password</p>';
    setMessage(message);
  }

  function recoverPasswordFailure( error ){
    $ionicLoading.hide();
    var errorMessage = formatErrorMessage( 'There was a problem emailing you a new password please try again' );
    setMessage(errorMessage);
  }

  $scope.doRecoverPassword = function(){
    console.log('<GFF> LoginCtrl : doRecoverPassword: ' + JSON.stringify($scope.data));
    ionic.trigger(EVENTS.asynchronousUserEvents);
    Ionic.User.current().resetPassword().then(recoverPasswordSuccess, recoverPasswordFailure);
  }

  ionic.on(EVENTS.asynchronousUserEvents, function(){
    $ionicLoading.show({
      template: '<ion-spinner icon=\'ripple\' class=\'spinner-light\'></ion-spinner>'
    });
  })
})
