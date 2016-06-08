controllers.controller('GiveDetailCtrl', function($scope, $stateParams, Charities, AdUtil, Settings ){
  $scope.charity = Charities.get($stateParams.charityId);

  function showAd() {
    if( Settings.isBannerAd() ){
      console.log('<GFF> GiveDetailCtrl Banner AdUnit: ', $scope.charity.banner );
      AdUtil.showBannerAd( $scope.charity.banner  );
    } else {
      console.log('<GFF> GiveDetailCtrl Interstitial AdUnit: ', $scope.charity.interstitial);
      AdUtil.showInterstitialAd( $scope.charity.interstitial  );
    }
  }

  $scope.$on('$ionicView.enter', showAd );
});
