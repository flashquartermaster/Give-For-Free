angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, DeveloperSettings, AdUtil) {

  $scope.developerSettings = DeveloperSettings.get();

  function showBannerAd() {
    console.log('<GFF> HomeCtrl showBannerAd AdUnit: ', $scope.developerSettings.banner);
    AdMob.removeBanner();
    AdMob.createBanner( {
        adId: $scope.developerSettings.banner,
        //isTesting: true,
        overlap: false,
        offsetTopBar: false,
        adSize:'SMART_BANNER',
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        overlap:false,
        bgColor: 'black',
        autoShow: true
    } );
  }

  $scope.$on('$ionicView.enter', showBannerAd );

  //Why does this not fucking work and breaks the layout of tab-home.html it works everywhere else?????
  //$scope.$on('$ionicView.enter', AdUtil.showBannerAd( $scope.developerSettings.banner ) );

})

.controller('GiveCtrl', function($scope, Charities) {
  $scope.charities = Charities.all();
})

.controller('GiveDetailCtrl', function($scope, $stateParams, Charities, AdUtil ){
  $scope.charity = Charities.get($stateParams.charityId);
  $scope.$on('$ionicView.enter', AdUtil.showBannerAd( $scope.charity.banner ) );
})

.controller('SettingsCtrl', function($scope) {});
