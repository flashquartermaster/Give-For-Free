controllers.controller('TabCtrl', function($scope, $ionicHistory, $state, $ionicTabsDelegate, $ionicPopup, ConnectivityMonitor) {

  $scope.giveClick = false;

  $scope.giveTabSelected = function(){
    $scope.giveClick = true;
  }

  function navigateFromGiveDetail(){
    var currentStateName = $ionicHistory.currentStateName();

    if( currentStateName == 'tab.give-detail' && $scope.giveClick){
      $ionicHistory.nextViewOptions({
         disableAnimate: true
       });
       $state.go('tab.give');
    }

    $scope.giveClick = false;
  }

  $scope.$on('$ionicView.beforeEnter', navigateFromGiveDetail );

});
