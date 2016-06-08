controllers.controller('GiveDetailCtrl', function($scope, $stateParams, Charities, AdUtil, Settings ){
  $scope.charity = Charities.get($stateParams.charityId);

  function showAd() {
    if( Settings.isBannerAd() ){
      console.log('<GFF> GiveDetailCtrl Banner AdUnit: ' + Charities.getBannerAdvert($scope.charity.adverts) );
      AdUtil.showBannerAd( Charities.getBannerAdvert($scope.charity.adverts) );
    } else {
      console.log('<GFF> GiveDetailCtrl Interstitial AdUnit: ' + Charities.getFullScreenAdvert($scope.charity.adverts) );
      AdUtil.showInterstitialAd( Charities.getFullScreenAdvert($scope.charity.adverts) );
    }
  }

  $scope.$on('$ionicView.enter', showAd );
});
