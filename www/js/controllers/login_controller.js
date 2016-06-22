controllers.controller('LoginCtrl', function($scope, $ionicHistory, $state, $ionicPopup, Settings) {
  $scope.isLogin = true;
  $scope.isSignUp = false;
  $scope.isForgotPassword = false;

  function onBeforeEnter(){
    //check if we are logged in and navigate accordingly
    var user = Ionic.User.current();

    console.log('<GFF> LoginCtrl: User: ' + JSON.stringify(user.details));
    console.log('<GFF> LoginCtrl: User is Logged In: ' + user.isAuthenticated());

    if( user.isAuthenticated() )
    {
      $ionicHistory.nextViewOptions({
         disableAnimate: true
      });
      $state.go('tab.home');
    } else {
      $scope.data = {remember:false};
    }
  }

  $scope.$on('$ionicView.beforeEnter', onBeforeEnter );

  $scope.showLogin = function(){
    $scope.isLogin = true;
    $scope.isSignUp = false;
    $scope.isForgotPassword = false;
  }

  $scope.showCreateAccount = function(){
    $scope.isLogin = false;
    $scope.isSignUp = true;
    $scope.isForgotPassword = false;
  }

  $scope.showForgotPassword = function(){
    $scope.isLogin = false;
    $scope.isSignUp = false;
    $scope.isForgotPassword = true;
  }

  function loginSuccess( user ){
    console.log('<GFF> LoginCtrl: loginSuccess');
    $state.reload();
  }

  function loginFailure( errors ){
    console.log('<GFF> LoginCtrl: loginFailure: ' + JSON.stringify(errors) );
    /*{"response":{
      "seq_id":2,
      "id":"2: POST https://api.ionic.io/auth/login",
      "_id":"2: POST https://api.ionic.io/auth/login",
      "timeoutTimer":92,
      "statusCode":401,
      "body":{
        "meta":{
          "status":401,
          "request_id":
          "dadfcb69-0a2e-4c33-8d0b-a1ae0b3bf5a6",
          "version":"2.0.0-beta.0"
        },
        "error":{
          "link":null,
          "message":"Invalid password",
          "type":"Unauthorized"
        }
      }
    },
    "error":{}
  }*/

    var alertPopup = $ionicPopup.alert({
      title: 'Login Error!',
      template: errors.response.body.error.message
    });
  }

  $scope.doSignUp = function(){
    console.log('<GFF> LoginCtrl : doSignUp: ' + JSON.stringify($scope.data));

    function signupSuccess( newUser ){
      var user = Ionic.User.current();
      console.log('<GFF> LoginCtrl: signupSuccess: User: ' + JSON.stringify(user.details));

      var alertPopup = $ionicPopup.alert({
          title: 'You have sucessfully signed up!',
          scope: $scope,
          buttons: [
            { text: 'Ok' },
            { text: 'Ok and keep me logged in',
               type: 'button-positive',
                  onTap: function(e) {
                    $scope.data.remember = true;
                  }
            }]
      });

      alertPopup.then(function(response){
        console.log('<GFF> LoginCtrl : signupSuccess: and remember me? ' + $scope.data.remember);
        var loginProvider = 'basic';
        var loginSettings = {
          remember: $scope.data.remember
        };

        var loginDetails = {
          email: $scope.data.email,
          password: 'f'
        }

        Ionic.Auth.login(loginProvider, loginSettings, loginDetails).then(loginSuccess, loginFailure);

      });
    }

    function signupFailure( errors ){

      var i, arr = errors.errors, len = arr.length, msg = '';

      for (i = 0; i < len; i++) {
        console.log('<GFF> LoginCtrl: signupFailure: ' + arr[i]);
        switch (arr[i]) {
          case 'required_email':
            msg += 'You must supply and email address<br>';
            break;
          case 'required_password':
            msg += 'You must supply a password<br>'
            break;
          case 'conflict_email':
            msg += 'An account has already been registered with this email<br>'
            break;
          case 'conflict_username':
            msg += 'This user name is currently in use<br>'
            break;
          case 'invalid_email':
            msg += 'You must supply a valid email address<br>'
            break;
          default:
            msg = 'there has been an error signing you up plaese try again. '
            + 'If you continue to experience difficulties plaese contact support@giveforfreeonline.org'
        }
      }


      var alertPopup = $ionicPopup.alert({
          title: 'Sign Up failed!',
          template: msg
      });
    }

    var signUpData = {
      email: $scope.data.email,
      password: $scope.data.password,
      username: $scope.data.email,
      name: $scope.data.firstname + ' ' + $scope.data.lastname,
      custom: {
        settings: Settings.getCurrentSettings()
      }
    }

    Ionic.Auth.signup(signUpData).then(signupSuccess, signupFailure);

  }

  $scope.doLogin = function( isValid ){
    console.log('<GFF> LoginCtrl : doLogin: ' + JSON.stringify($scope.data));
    if ( isValid ) {
        $state.go('tab.home');
    }
  }

  $scope.doRecoverPassword = function(){
    console.log('<GFF> LoginCtrl : doRecoverPassword: ' + JSON.stringify($scope.data));
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

})
