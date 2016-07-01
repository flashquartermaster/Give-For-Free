controllers.controller('ChangePasswordCtrl', function($scope, $state, $ionicLoading, $ionicPopup, $rootScope, EVENTS) {
  $scope.data = {};
  $scope.message = '';
  $scope.recoveredMessage = '';

  function onViewEnter(event, data) {
    //$scope.data.currentPassword = 'hello';
    //$scope.data.newPassword = '15205274';
    //$scope.data.confirmNewPassword = '15205274';
    setHeaderMessage('');
    setMessage('');

    if( $rootScope.hasRequestedNewPassword )
    {
      var message = formatMessage('You have just received a new tempory password it is advisable that you change it immediately');
      setHeaderMessage(message);
    }
  }

  $scope.$on('$ionicView.enter', onViewEnter );

  $scope.goToSettings = function(){
    $state.go('tab.settings');
  }

  function userSaveSuccess( saveSuccess ) {
    console.log('<GFF> ChangePasswordCtrl: userSaveSuccess: success: ' + JSON.stringify( saveSuccess.response.body.data.details ) );
    $ionicLoading.hide();
    var message = formatMessage('You have successfully changed your password');
    setHeaderMessage('');
    setMessage(message);
    $rootScope.hasRequestedNewPassword = false;
  };

  function userSaveFailure( saveError ) {
    console.log('<GFF> ChangePasswordCtrl: userSaveFailure: error: ' + JSON.stringify( saveError ) );

    $ionicLoading.hide();

    var alertPopup = $ionicPopup.alert({
       title: 'Save New Password Error',
       template: '<p class="text-center">There was a problem saving your new password: ' + saveError.response.body.error.message + '</p>'
    });

  };

  function basicLoginSuccess( user ){
    console.log('<GFF> ChangePasswordCtrl: basicLoginSuccess');
    setMessage('');
    var user = Ionic.User.current();
    user.details.password = $scope.data.newPassword;
    user.save().then( userSaveSuccess, userSaveFailure );
  }

  function ionicLoginFailure( errors ){
    console.log('<GFF> ChangePasswordCtrl: ionicLoginFailure: ' + JSON.stringify(errors) );
    $ionicLoading.hide();
    var errorMessage = formatErrorMessage( 'You must enter your current password correctly in order to change it' );
    setMessage(errorMessage);
  }

  $scope.doChangePassword = function(){
    var currentPassword = $scope.data.currentPassword;

    //attempt a login if that is ok then save new password
    var user = Ionic.User.current();
    ionic.trigger(EVENTS.asynchronousUserEvents);
    Ionic.Auth.login('basic', {remember : false}, {email: user.details.email, password: currentPassword})
      .then(basicLoginSuccess, ionicLoginFailure);
  }

  function setMessage(message){
    $scope.message = message;
    $scope.$apply();//Because variable change is not updating the view
  }

  function setHeaderMessage( message ){
    $scope.recoveredMessage = message;
    $scope.$apply();
  }

});
