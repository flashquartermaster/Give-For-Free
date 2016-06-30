controllers.controller('LoginCtrl', function($scope, $ionicHistory, $state, $ionicLoading, $openFB, $cordovaOauth, $cordovaOauthUtility, $http, Settings, Charities, EVENTS) {
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

  function basicLoginSuccess( user ){
    //console.log('<GFF> LoginCtrl: basicLoginSuccess: login user: ' + JSON.stringify( user.get('settings') ) );
    //console.log('<GFF> LoginCtrl: basicLoginSuccess: localstorage user: ' + JSON.stringify( Ionic.User.current().get('settings') ) );
    $ionicLoading.hide();
    $state.go('tab.home');
  }

  function ionicLoginFailure( errors ){
    console.log('<GFF> LoginCtrl: ionicLoginFailure: ' + JSON.stringify(errors) );
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

    errorMessage += formatErrorMessage( 'There has been an error logging you in please try again. '
    + 'If you continue to experience difficulties please contact support@giveforfreeonline.org' );

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
    Ionic.Auth.login('basic', loginSettings(), loginDetails() ).then(basicLoginSuccess, ionicLoginFailure);
  }

  function facebookLoginSuccess( newUser ){
    console.log('<GFF> LoginCtrl: facebookLoginSuccess: ' + JSON.stringify( newUser ) );
    //console.log('<GFF> LoginCtrl: facebookLoginSuccess: ' + JSON.stringify( Ionic.User.current() ) );
    var user = Ionic.User.current();

    //https://graph.facebook.com/oauth/access_token?client_id=539216159536968&client_secret=3bb496b760f5d92408454e6b53e9f9d3&grant_type=client_credentials

    function openFBLoginSuccess( loginSuccessData ){
      console.log('<GFF> LoginCtrl: facebookLoginSuccess: openFBLoginSuccess: success: ' + JSON.stringify( loginSuccessData ) );
      //"status":"connected",
      //"authResponse":{
      //  "token":"EAAHqaguld0gBAM3n2BePiPZCPk5kiMNswWrGqOjn9C8AWO4nqGwpLfDAycWU2p6bQdLViPb6U2vOEEcyfBCijFXTqetMfIusopK1Kvh8Hu5to1zMcbnBDS0YZB8vrzLC9kwcSLMQXOkgZCtFpSWAdfvGG3m9mIZD"
      //}
      //console.log('<GFF> LoginCtrl: facebookLoginSuccess: login: success: for user: ' + user.details.facebook_id );

      function openFBApiSuccess( apiSuccess ){
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
          errorMessage += formatErrorMessage( 'There has been an error saving your details. '
          + 'If you continue to experience difficulties please contact support@giveforfreeonline.org' );
          setMessage(errorMessage);
        };

        user.save().then( userSaveSuccess, userSaveFailure );
      }

      function openFBApiFailure( apiError ){
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

      $openFB.api({path: '/me',params: {fields: 'email,name,picture'}}).then( openFBApiSuccess, openFBApiFailure );
    }

    function openFBLoginFailure( loginError ) {
      console.log('<GFF> LoginCtrl: facebookLoginSuccess: openFBLoginFailure: error: ' + JSON.stringify( loginError ) );
      //{"error":"user_cancelled","error_description":"User cancelled login process","error_reason":"user_cancelled"}
      var errorMessage = formatErrorMessage( 'Login Error: ' + loginError.error_description );
      setMessage(errorMessage);
    }

    $openFB.login({scope: 'public_profile,email,user_friends,publish_actions'}).then( openFBLoginSuccess, openFBLoginFailure );

  }

  $scope.doFacebookLogin = function(){
    console.log('<GFF> LoginCtrl : doFacebookLogin: ' + JSON.stringify($scope.data));

    /*
    $openFB.init({
      appId: '539216159536968',
      cordovaOauthCallback: 'http://api.giveforfreeonline.org/oauthcallback.html'
    });
    */

    //Ionic.Auth.login('facebook', {'remember': true}).then(facebookLoginSuccess, ionicLoginFailure);

    /*var flowUrl = "https://www.facebook.com/v2.6/dialog/oauth?client_id=" + clientId + "&redirect_uri=" + redirect_uri + "&response_type=token&scope=" + appScope.join(",");
    if(options !== undefined && options.hasOwnProperty("auth_type")) {
      flowUrl += "&auth_type=" + options.auth_type;
    }*/

    $cordovaOauth.facebook('539216159536968',["email", "public_profile"]).then(
        function(cordovaOauthResult) {
          console.log('<GFF> LoginCtrl : $cordovaOauth.facebook: sucess: ' + JSON.stringify(cordovaOauthResult));

          $http.get("https://graph.facebook.com/v2.6/me",
                    {
                      params: {
                                access_token: cordovaOauthResult.access_token,
                                fields: "name,email,picture",
                                format: "json"
                              }
                    }
            ).then(
            function(facebookApiResult) {
              console.log('<GFF> LoginCtrl : http facebook api call : sucess: ' + JSON.stringify(facebookApiResult));
            },
            function(facebookApiError){
              console.log('<GFF> LoginCtrl : http facebook api call : error: ' + JSON.stringify(facebookApiError));
              /*
              {"data":{
                "error":{
                  "message":"An active access token must be used to query information about the current user.",
                  "type":"OAuthException",
                  "code":2500,
                  "fbtrace_id":"ETeq+8xMvrz"
                }
              },
              "status":400,
              "config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"params":{"fields":"name,email,picture","format":"json"},"url":"https://graph.facebook.com/v2.6/me","headers":{"Accept":"application/json, text/plain, "}},
              "statusText":"Bad Request"}
              */
              var errorMessage = formatErrorMessage( '"' + facebookApiError.statusText
                  + '", "Error code: ' + facebookApiError.data.error.code + '", "type: '
                  + facebookApiError.data.error.type +'" "'
                  + facebookApiError.data.error.message +'"' );

              errorMessage += formatErrorMessage( 'There has been an error getting your details please try again. '
              + 'If you continue to experience difficulties please contact support@giveforfreeonline.org' );

              setMessage(errorMessage);
            });
        },
        function(cordovaOauthError) {
            console.log('<GFF> LoginCtrl : $cordovaOauth.facebook: error: ' + JSON.stringify(cordovaOauthError));

            var errorMessage = formatErrorMessage(cordovaOauthError);

            errorMessage += formatErrorMessage( 'There has been an error logging you in please try again. '
            + 'If you continue to experience difficulties please contact support@giveforfreeonline.org' );

            setMessage(errorMessage);
        });

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
            Ionic.Auth.login('facebook', {'remember': true}).then(facebookLoginSuccess, ionicLoginFailure);
          } else {
            //Dont fail silently
          }
      });
      */
  }

  $scope.doTwitterLogin = function(){
    console.log('<GFF> LoginCtrl : doTwitterLogin');

    var consumer_key = 'zRW9N5rxdTY2rojfnRHvHqQeL';
    var consumer_secret = 'xr9NJUcwkZKDFgoUYmKEIrhrZ02gkqgDbOa3PTp9DODYFNx0gN';

    $cordovaOauth.twitter(consumer_key, consumer_secret).then(
      function(cordovaOauthResult) {
          console.log('<GFF> LoginCtrl : $cordovaOauth.twitter: sucess: ' + JSON.stringify(cordovaOauthResult));

          var oauthObject = {
            oauth_consumer_key: consumer_key,
            oauth_nonce: $cordovaOauthUtility.createNonce(32),
            oauth_signature_method: "HMAC-SHA1",
            oauth_token: cordovaOauthResult.oauth_token,
            oauth_timestamp: Math.round((new Date()).getTime() / 1000.0),
            oauth_version: "1.0"
          };

          var signatureObj = $cordovaOauthUtility.createSignature(
            "GET",
            "https://api.twitter.com/1.1/account/verify_credentials.json",
            oauthObject,
            //{ oauth_callback: 'http://localhost/callback', screen_name:result.screen_name },
            //{ screen_name:result.screen_name },
            { screen_name: cordovaOauthResult.screen_name, include_email: true },
             consumer_secret,
             cordovaOauthResult.oauth_token_secret
           );

          var twitterApiRequest = { method: 'GET',
              url: "https://api.twitter.com/1.1/account/verify_credentials.json",
              headers: {
                  "Authorization": signatureObj.authorization_header
              },
              data: "oauth_callback=" + encodeURIComponent('http://localhost/callback'),
              params: { screen_name: cordovaOauthResult.screen_name, include_email: true}
            };

          $http( twitterApiRequest ).then(
              function(twitterApiResult) {
                //console.log('<GFF> LoginCtrl : twitter api: sucess: ' + JSON.stringify(twitterApiResult));
                console.log('<GFF> LoginCtrl : twitter api: name: ' + twitterApiResult.data.name + ', and ' + twitterApiResult.data.screen_name);
                console.log('<GFF> LoginCtrl : twitter api: email: ' + twitterApiResult.data.email);
                console.log('<GFF> LoginCtrl : twitter api: picture: ' + twitterApiResult.data.profile_image_url + ', and ' + twitterApiResult.data.profile_image_url_https);

                //TESTING ONLY REMOVE ME
                twitterApiResult.data.email = 'tom@flashquartermaster.com';

                if( twitterApiResult.data.email == undefined)
                {
                  var errorMessage = formatErrorMessage( 'You do not have a validated email address associated with your twitter account '
                  + 'so we are unable to log you in. Please either add or validate your twitter email address or use the "create an account" '
                  + 'button instead');
                  setMessage(errorMessage);
                } else {
                  ionic.trigger(EVENTS.asynchronousUserEvents);
                  //do sign up or attenmpt login then do sign up and login
                  Ionic.Auth.signup( {
                    email: twitterApiResult.data.email,
                    password: twitterApiResult.data.screen_name,
                    name: twitterApiResult.data.name,
                    image: twitterApiResult.data.profile_image_url_https,
                    custom: {
                      settings: Settings.getInitialSettings(),
                      charities: Charities.getInitialCharities(),
                      twitter_id: twitterApiResult.data.id
                    }
                  }).then(
                    function(signUpSuccess){
                      console.log('<GFF> LoginCtrl : twitter api: sign up success: ' + JSON.stringify(signUpSuccess));
                      Ionic.Auth.login('basic', {remember: true}, {
                        email: twitterApiResult.data.email,
                        password: twitterApiResult.data.screen_name
                      } ).then(basicLoginSuccess, ionicLoginFailure);
                    },
                    function(signUpError){
                      console.log('<GFF> LoginCtrl : twitter api: sign up error: ' + JSON.stringify(signUpError));

                      var i, arr = signUpError.errors, len = arr.length, errorMessage = '';

                      for (i = 0; i < len; i++) {
                        console.log('<GFF> LoginCtrl : twitter api: sign up error '+i+': ' + arr[i]);
                        switch (arr[i]) {
                          case 'required_email':
                            errorMessage += formatErrorMessage( 'You must supply and email address' );
                            break;
                          case 'required_password':
                            errorMessage += formatErrorMessage( 'You must supply a password' );
                            break;
                          case 'conflict_username':
                            errorMessage += formatErrorMessage( 'This user name is currently in use' );
                            break;
                          case 'invalid_email':
                            errorMessage += formatErrorMessage( 'You must supply a valid email address' );
                            break;
                          case 'conflict_email'://conflict_email so login as they aleady have an account
                            Ionic.Auth.login('basic', {remember: true}, {
                              email: twitterApiResult.data.email,
                              password: twitterApiResult.data.screen_name
                            }).then(basicLoginSuccess, ionicLoginFailure);
                            break;
                        }
                      }

                      if( errorMessage.length > 0 )
                      {
                        errorMessage += formatErrorMessage( 'There has been an error signing you up in please try again. '
                        + 'If you continue to experience difficulties please contact support@giveforfreeonline.org' );
                        setMessage(errorMessage);
                        $ionicLoading.hide();
                      }
                    });
                  }
                },
                function(twitterApiError) {
                  console.log('<GFF> LoginCtrl : twitter api: error: ' + JSON.stringify(twitterApiError));
                  /*
                  {"data":{
                    "errors":[{
                      "code":215,
                      "message":"Bad Authentication data."}]
                    },
                    "status":400,
                    "config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"url":"https://api.twitter.com/1.1/account/verify_credentials.json","headers":{"Accept":"application/json, text/plain, *"},
                    "data":"oauth_callback=http%3A%2F%2Flocalhost%2Fcallback",
                    "params":{"screen_name":"flashquartermas","include_email":true}},
                    "statusText":"Bad Request"}
                  */

                  var i, arr = twitterApiError.data.errors, len = arr.length, errorMessage = '';

                  for (i = 0; i < len; i++) {
                    errorMessage += formatErrorMessage( '"' + twitterApiError.statusText + '", "Error code: ' + arr[i].code + '", ' + arr[i].message +'"' );
                  }

                  errorMessage += formatErrorMessage( 'There has been an error getting your details please try again. '
                  + 'If you continue to experience difficulties please contact support@giveforfreeonline.org' );

                  setMessage(errorMessage);

                });
      }, function(cordovaOauthError) {
          console.log('<GFF> LoginCtrl : $cordovaOauth.twitter: error: ' + JSON.stringify(cordovaOauthError));

          var errorMessage = formatErrorMessage(cordovaOauthError);

          errorMessage += formatErrorMessage( 'There has been an error logging you in please try again. '
          + 'If you continue to experience difficulties please contact support@giveforfreeonline.org' );

          setMessage(errorMessage);
      });
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
    Ionic.Auth.login('basic', {remember: true}, loginDetails() ).then(basicLoginSuccess, ionicLoginFailure);
  }

  function signupFailure( errors ){
    $ionicLoading.hide();

    var i, arr = errors.errors, len = arr.length, errorMessage = '';

    for (i = 0; i < len; i++) {
      console.log('<GFF> LoginCtrl: signupFailure: error '+i+': ' + arr[i]);
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
      }
    }

    errorMessage += formatErrorMessage( 'There has been an error signing you up please try again. '
    + 'If you continue to experience difficulties please contact support@giveforfreeonline.org' );

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
