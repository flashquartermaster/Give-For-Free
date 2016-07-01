controllers.controller('LoginCtrl', function($scope, $ionicHistory, $state, $ionicLoading,
                                              $cordovaOauth, $cordovaOauthUtility, $http,
                                              $rootScope, Settings, Charities, EVENTS) {
  $scope.data = {};
  $scope.isLogin = true;
  $scope.isSignUp = false;
  $scope.isForgotPassword = false;
  $scope.message = '';
  $scope.isCurrentUser = false;
  $scope.firstname = '';
  $scope.forgotPassword = false;

  function onBeforeEnter(event, data){
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
    //Multiple errors response
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
    //1 error response
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

  $scope.doLogin = function(){
    console.log('<GFF> LoginCtrl : doLogin: ' + JSON.stringify($scope.data));
    ionic.trigger(EVENTS.asynchronousUserEvents);
    Ionic.Auth.login('basic', loginSettings(), loginDetails() ).then(basicLoginSuccess, ionicLoginFailure);
  }

  $scope.doFacebookLogin = function(){
    console.log('<GFF> LoginCtrl : doFacebookLogin: ' + JSON.stringify($scope.data));

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
              //console.log('<GFF> LoginCtrl : http facebook api call : sucess: ' + JSON.stringify(facebookApiResult));

              /*
              {"data":{
                "name":"Tom Coxen",
                "email":"tom@flashquartermaster.com",
                "picture":{"data":{"is_silhouette":false,"url":"https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13507116_10153588713215825_2193649314685503822_n.jpg?oh=7221bc3d6d7df42100bd5eda9a0dfdd1&oe=580008EC"}},
                "id":"10153574027365825"},"status":200,"config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"params":{"access_token":"EAAHqaguld0gBAGQCGk6og8gN3P8tZCLbwtQY6z05gaYaI11o5YmOcVBgP0sKA4hStCykdlZCFZCWwlsjqyDNIMDLcXU9byhEOAwbiwbQZAeeiBZAeeFgSSZCH8F1DbTR3jN0ZBhQMvJ8oR0rqixrEq8OZA7ZBx5iZAfPkZD","fields":"name,email,picture","format":"json"},"url":"https://graph.facebook.com/v2.6/me","headers":{"Accept":"application/json, text/plain,"}},"statusText":"OK"}
              */

              console.log('<GFF> LoginCtrl : facebook api: id: ' + facebookApiResult.data.id);
              console.log('<GFF> LoginCtrl : facebook api: name: ' + facebookApiResult.data.name);
              console.log('<GFF> LoginCtrl : facebook api: email: ' + facebookApiResult.data.email);
              console.log('<GFF> LoginCtrl : facebook api: picture: ' + facebookApiResult.data.picture.data.url);

              if( facebookApiResult.data.email == undefined)
              {
                var errorMessage = formatErrorMessage( 'You do not have a confirmed email address associated with your facebook account '
                + 'so we are unable to log you in. Please either add or confim your facebook email address or use the "create an account" '
                + 'button instead');
                setMessage(errorMessage);
              } else {

                ionic.trigger(EVENTS.asynchronousUserEvents);
                //do sign up or attempt login then do sign up and login
                Ionic.Auth.signup( {
                  email: facebookApiResult.data.email,
                  password: facebookApiResult.data.id,
                  name: facebookApiResult.data.name,
                  image: facebookApiResult.data.picture.data.url,
                  username: facebookApiResult.data.email,
                  custom: {
                    settings: Settings.getInitialSettings(),
                    charities: Charities.getInitialCharities(),
                    facebook_id: facebookApiResult.data.id
                  }
                }).then(
                  function(signUpSuccess){
                    console.log('<GFF> LoginCtrl : twitter api: sign up success: ' + JSON.stringify(signUpSuccess));
                    Ionic.Auth.login('basic', {remember: true}, {
                      email: facebookApiResult.data.email,
                      password: facebookApiResult.data.id
                    } ).then(basicLoginSuccess, ionicLoginFailure);
                  },
                  function(signUpError){
                    console.log('<GFF> LoginCtrl : facebook api: sign up error: ' + JSON.stringify(signUpError));

                    var i, arr = signUpError.errors, len = arr.length, errorMessage = '';

                    for (i = 0; i < len; i++) {
                      console.log('<GFF> LoginCtrl : facebook api: sign up error '+i+': ' + arr[i]);
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
                        case 'invalid_password':
                          errorMessage += formatErrorMessage( 'There was a problem with your username or password' );
                          break;
                        case 'conflict_email'://conflict_email so login as they aleady have an account
                          Ionic.Auth.login('basic', {remember: true}, {
                            email: facebookApiResult.data.email,
                            password: facebookApiResult.data.id
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
                //console.log('<GFF> ****** LoginCtrl : twitter api: sucess: ' + JSON.stringify(twitterApiResult));
                console.log('<GFF> LoginCtrl : twitter api: id: ' + twitterApiResult.data.id);
                console.log('<GFF> LoginCtrl : twitter api: name: ' + twitterApiResult.data.name + ', and ' + twitterApiResult.data.screen_name);
                console.log('<GFF> LoginCtrl : twitter api: email: ' + twitterApiResult.data.email);
                console.log('<GFF> LoginCtrl : twitter api: picture: ' + twitterApiResult.data.profile_image_url + ', and ' + twitterApiResult.data.profile_image_url_https);

                if( twitterApiResult.data.email == undefined)
                {
                  var errorMessage = formatErrorMessage( 'You do not have a validated email address associated with your twitter account '
                  + 'so we are unable to log you in. Please either add or validate your twitter email address or use the "create an account" '
                  + 'button instead');
                  setMessage(errorMessage);
                } else {
                  ionic.trigger(EVENTS.asynchronousUserEvents);
                  //do sign up or attempt login then do sign up and login
                  Ionic.Auth.signup( {
                    email: twitterApiResult.data.email,
                    password: twitterApiResult.data.id_str,
                    name: twitterApiResult.data.name,
                    image: twitterApiResult.data.profile_image_url_https,
                    username: twitterApiResult.data.email,
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
                        password: twitterApiResult.data.id_str
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
                          case 'invalid_password':
                            errorMessage += formatErrorMessage( 'There was a problem with your username or password' );
                            break;
                          case 'conflict_email'://conflict_email so login as they aleady have an account
                            Ionic.Auth.login('basic', {remember: true}, {
                              email: twitterApiResult.data.email,
                              password: twitterApiResult.data.id_str
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
        case 'invalid_password':
          errorMessage += formatErrorMessage( 'There was a problem with your username or password' );
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
    var message = formatMessage('An email has been sent to ' + Ionic.User.current().details.email + ' with a new password');
    setMessage(message);
    $rootScope.hasRequestedNewPassword = true;
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
})
