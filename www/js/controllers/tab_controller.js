controllers.controller('TabCtrl', function($scope, $state, $ionicHistory, $ionicNavBarDelegate) {
  $scope.giveTap = false;
  $scope.settingsTap = false;
  $ionicNavBarDelegate.showBackButton(false);

  $scope.giveTabSelected = function(){
    $scope.giveTap = true;
  }

  $scope.settingsTabSelected = function(){
    $scope.settingsTap = true;
  }

  function navigateFromGiveDetail(){
    if( $state.is('tab.give-detail') && $scope.giveTap){
      $ionicHistory.nextViewOptions({
         disableAnimate: true
      });
      $state.go('tab.give');
    }
    $scope.giveTap = false;
  }

  function navigateFromPasswordChange(){
    if( $state.is('tab.change-password') && $scope.settingsTap){
      $ionicHistory.nextViewOptions({
         disableAnimate: true
      });
      $state.go('tab.settings');
    }
    $scope.settingsTap = false;
  }

  function onBeforeEnter(event, data){
    navigateFromGiveDetail();
    navigateFromPasswordChange();
  }

  $scope.$on('$ionicView.beforeEnter', onBeforeEnter );

});
