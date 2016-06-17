controllers.controller('TabCtrl', function($scope, $state, $ionicHistory, $ionicNavBarDelegate) {

  $scope.giveClick = false;
  $ionicNavBarDelegate.showBackButton(false);

  $scope.giveTabSelected = function(){
    $scope.giveClick = true;
  }

  function navigateFromGiveDetail(){
    if( $state.is('tab.give-detail') && $scope.giveClick){
      $ionicHistory.nextViewOptions({
         disableAnimate: true
      });
      $state.go('tab.give');
    }

    $scope.giveClick = false;
  }

  $scope.$on('$ionicView.beforeEnter', navigateFromGiveDetail );

});
