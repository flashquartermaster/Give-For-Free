controllers.controller('LoginCtrl', function($scope, $ionicHistory, $state, Login) {
  $scope.isLogin = true;
  $scope.isSignUp = false;
  $scope.isForgotPassword = false;

  function onBeforeEnter(){
    //check if we are logged in and navigate accordingly
    var user = Ionic.User.current();

    console.log('<GFF> LoginCtrl: User: ' + JSON.stringify(user));
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

  $scope.doSignUp = function(){
    console.log('<GFF> LoginCtrl : doSignUp: ' + JSON.stringify($scope.data));
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
