controllers.controller('GiveDetailCtrl', function($scope, $stateParams, Charities, AdUtil, Settings ){
  $scope.charity = Charities.get($stateParams.charityId);
  $scope.thankyou = '';

  function onViewEnter() {
    if( Settings.isBannerAd() ){
      console.log('<GFF> GiveDetailCtrl Banner AdUnit: ' + Charities.getBannerAdvert($scope.charity.adverts) );
      AdUtil.showBannerAd( Charities.getBannerAdvert($scope.charity.adverts) );
    } else {
      console.log('<GFF> GiveDetailCtrl Interstitial AdUnit: ' + Charities.getFullScreenAdvert($scope.charity.adverts) );
      AdUtil.showInterstitialAd( Charities.getFullScreenAdvert($scope.charity.adverts) );
    }
  }

  function onBeforeViewEnter(){
    $scope.thankyou = '';
  }

  $scope.$on('$ionicView.enter', onViewEnter );
  $scope.$on('$ionicView.beforeEnter', onBeforeViewEnter );

  document.addEventListener('onAdLoaded', function(data){
    $scope.thankyou = 'Thank You';
  });
});
