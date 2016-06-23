controllers.controller('LoginCtrl', function($scope, $ionicHistory, $state, $ionicPopup, Settings) {
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
    console.log('<GFF> LoginCtrl: User: ' + JSON.stringify(Ionic.User.current()) );
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
    console.log('<GFF> LoginCtrl: loginSuccess');
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
    var errorsArray = errors.response.body.error.details, i, len = errorsArray ? errorsArray.length : 0,
                      errorMessage = '<p class="error-message">' + errors.response.body.error.message + '</p>';

    if( len > 0 ){
      for (i = 0; i < len; i++) {
        var error = errorsArray[i];
        errorMessage += '<p class="error-message">' + error.parameter[0].toUpperCase() + error.parameter.slice(1) + ': ' + error.errors[0] + '</p>'
      }
    }

    setMessage(errorMessage);
  }

  function setMessage(message){
    $scope.message = message;
    $scope.$apply();//Because variable change is not updating the view
  }

  $scope.doLogin = function(){
    console.log('<GFF> LoginCtrl : doLogin: ' + JSON.stringify($scope.data));
    Ionic.Auth.login('basic', loginSettings(), loginDetails() ).then(loginSuccess, loginFailure);
  }

  $scope.doFacebookLogin = function(){
    console.log('<GFF> LoginCtrl : doFacebookLogin: ' + JSON.stringify($scope.data));
  }

  $scope.doTwitterLogin = function(){
    console.log('<GFF> LoginCtrl : doTwitterLogin: ' + JSON.stringify($scope.data));
  }

  $scope.doGoogleLogin = function(){
    console.log('<GFF> LoginCtrl : doGoogleLogin: ' + JSON.stringify($scope.data));
  }

  //Sign Up functions
  function signUpData(){
    return {
      email: $scope.data.email,
      password: $scope.data.password,
      username: $scope.data.email,
      name: $scope.data.firstname + ' ' + $scope.data.lastname,
      custom: {
        settings: Settings.getCurrentSettings()
      }
    };
  }

  function signupSuccess( newUser ){
    Ionic.Auth.login('basic', {remember: true}, loginDetails() ).then(loginSuccess, loginFailure);
  }

  function signupFailure( errors ){

    var i, arr = errors.errors, len = arr.length, errorMessage = '';

    for (i = 0; i < len; i++) {
      console.log('<GFF> LoginCtrl: signupFailure: ' + arr[i]);
      switch (arr[i]) {
        case 'required_email':
          errorMessage += '<p class="error-message">You must supply and email address</p>';
          break;
        case 'required_password':
          errorMessage += '<p class="error-message">You must supply a password</p>'
          break;
        case 'conflict_email':
          errorMessage += '<p class="error-message">An account has already been registered with this email</p>'
          break;
        case 'conflict_username':
          errorMessage += '<p class="error-message">This user name is currently in use</p>'
          break;
        case 'invalid_email':
          errorMessage += '<p class="error-message">You must supply a valid email address</p>'
          break;
        default:
          errorMessage = '<p class="error-message">there has been an error signing you up plaese try again. '
          + 'If you continue to experience difficulties plaese contact support@giveforfreeonline.org</p>'
      }
    }

    setMessage(errorMessage);
  }

  $scope.doSignUp = function(){
    console.log('<GFF> LoginCtrl : doSignUp: ' + JSON.stringify($scope.data));
    Ionic.Auth.signup( signUpData() ).then(signupSuccess, signupFailure);
  }

  //Recover Password
  function recoverPasswordSuccess( response ){
    var message = '<p class="message">An email has been sent to ' + Ionic.User.current().details.email + ' with a new password</p>';
    setMessage(message);
  }

  function recoverPasswordFailure( error ){
    var errorMessage = '<p class="error-message">There was a problem emailing you a new password please try again</p>';
    setMessage(errorMessage);
  }

  $scope.doRecoverPassword = function(){
    console.log('<GFF> LoginCtrl : doRecoverPassword: ' + JSON.stringify($scope.data));
    Ionic.User.current().resetPassword().then(recoverPasswordSuccess, recoverPasswordFailure);
  }
})
