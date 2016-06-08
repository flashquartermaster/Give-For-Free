angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicHistory, $state, $ionicPopup, ConnectivityMonitor) {

  ionic.on(ConnectivityMonitor.networkChangedEventName, function(event){

    var isOffline = ConnectivityMonitor.isOffline();
    if( isOffline ){
      alertJson = {
        title:'Offline',
        template: 'You have gone offline, \'Give For Free\' will not be able to work correctly'};
    } else {
      alertJson = {
        title:'Online',
        template: 'Give For Free has come back online'};
    }

    var alertPopup = $ionicPopup.alert( alertJson );

    if( !isOffline){
      alertPopup.then(function(response){
        $ionicHistory.clearCache([$state.current.name]).then(function() {
          $state.reload();
        });
      });
    }
  }, window);
})

.controller('TabCtrl', function($scope, $ionicHistory, $state, $ionicTabsDelegate, $ionicPopup, ConnectivityMonitor) {

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

  function showHomeAd() {
    var platform = Settings.getPlatformSettings();
    console.log('<GFF> HomeCtrl showHomeAd Banner AdUnit: ', platform.developerBanner );
    AdUtil.showBannerAd( platform.developerBanner );
  }

  $scope.$on('$ionicView.enter', showHomeAd );

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

.controller('GiveDetailCtrl', function($scope, $stateParams, Charities, AdUtil, Settings ){
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
})

.controller('SettingsCtrl', function($scope, Settings, $state, $ionicHistory) {
    $scope.platformSettings = Settings.getPlatformSettings();
    $scope.adTypes = Settings.getAdTypes();
    $scope.locations = Settings.getLocations();

  $scope.onAdTypeCheckboxTap = function(){
    Settings.toggleAdType();
    $ionicHistory.clearCache([$state.current.name]).then(function() {
      $state.reload();
    });
  }

  $scope.onToggleLocationSetting = function( location ){
    console.log('<GFF> onToggleLocationSetting changed to ' + JSON.stringify(location));
  }

  $scope.resetDefaults = function(){
    window.localStorage.clear();
    Settings.setDefaultSettings();
  }
});
