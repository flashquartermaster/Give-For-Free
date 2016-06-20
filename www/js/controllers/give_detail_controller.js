controllers.controller('GiveDetailCtrl', function($scope, $state, $stateParams, $ionicViewSwitcher, Charities, AdUtil, Settings ){
  $scope.charity = Charities.get($stateParams.charityId);
  $scope.thankyou = '';

  $scope.onSwipeRight = function(){
    $ionicViewSwitcher.nextDirection('back');
    $state.go('tab.give-detail', { charityId: $scope.previousCharityId });
  }

  $scope.onSwipeLeft = function(){
    $ionicViewSwitcher.nextDirection('forward');
    $state.go('tab.give-detail', { charityId: $scope.nextCharityId });
  }

  function onBeforeViewEnter(){
    $scope.thankyou = '';
    $scope.previousCharityId = Charities.getPreviousCharityId($stateParams.charityId);
    $scope.nextCharityId = Charities.getNextCharityId($stateParams.charityId);
  }

  function onViewEnter() {
    if( Settings.isBannerAd() ){
      console.log('<GFF> GiveDetailCtrl Banner AdUnit: ' + Charities.getBannerAdvert($scope.charity.adverts) );
      AdUtil.showBannerAd( Charities.getBannerAdvert($scope.charity.adverts) );
    } else {
      console.log('<GFF> GiveDetailCtrl Interstitial AdUnit: ' + Charities.getFullScreenAdvert($scope.charity.adverts) );
      AdUtil.showInterstitialAd( Charities.getFullScreenAdvert($scope.charity.adverts) );
    }
  }

  $scope.$on('$ionicView.enter', onViewEnter );
  $scope.$on('$ionicView.beforeEnter', onBeforeViewEnter );

  document.addEventListener('onAdLoaded', function(data){
    $scope.thankyou = 'Thank You';
  });

  //Fix android swipe left and right not registering on this view
  document.ontouchmove = function(event) {
    event.preventDefault();
  };

});
