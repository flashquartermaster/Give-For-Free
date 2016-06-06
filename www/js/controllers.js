angular.module('starter.controllers', [])

.controller('TabCtrl', function($scope, $ionicHistory, $state, $ionicTabsDelegate) {

  $scope.giveClick = false;

  $scope.giveTabSelected = function(){
    $scope.giveClick = true;
  }

  $scope.$on('$ionicView.enter', function() {
     var currentStateName = $ionicHistory.currentStateName();

     if( currentStateName == 'tab.give-detail' && $scope.giveClick){
       $ionicHistory.nextViewOptions({
          disableAnimate: true
        });
        $state.go('tab.give');
     }

     $scope.giveClick = false;
  })
})

.controller('HomeCtrl', function($scope, Settings, AdUtil) {

  $scope.platformSettings = Settings.getPlatformSettings();

  function showBannerAd() {
    console.log('<GFF> HomeCtrl showBannerAd AdUnit: ', $scope.platformSettings.banner);
    AdMob.removeBanner();
    AdMob.createBanner( {
        adId: $scope.platformSettings.banner,
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

  $scope.onEmailTap = function(){
    window.open('mailto:support@giveforfree.co.uk', '_system', 'location=yes');  return false;
  }

  $scope.onFacebookTap = function(){
    window.open('http://www.facebook.com', '_system', 'location=yes');  return false;
  }

  $scope.onTwitterTap = function(){
    window.open('http://www.twitter.com', '_system', 'location=yes');  return false;
  }

})

.controller('GiveCtrl', function($scope, Charities) {
  $scope.charities = Charities.all();
})

.controller('GiveDetailCtrl', function($scope, $stateParams, Charities, AdUtil ){
  $scope.charity = Charities.get($stateParams.charityId);
  $scope.$on('$ionicView.enter', AdUtil.showBannerAd( $scope.charity.banner ) );
})

.controller('SettingsCtrl', function($scope, Settings, $state, $ionicHistory) {
  $scope.adTypes = Settings.getAdTypes();

  $scope.onAdTypeCheckboxTap = function(){
    Settings.toggleAdType();
    $ionicHistory.clearCache([$state.current.name]).then(function() {
      $state.reload();
    });
  }

  $scope.locations = Settings.getLocations();

  $scope.onToggleLocationSetting = function( location ){
    console.log('<GFF> onToggleLocationSetting changed to ' + JSON.stringify(location));
  }
});
