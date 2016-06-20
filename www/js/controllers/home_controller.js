controllers.controller('HomeCtrl', function($scope, Settings, AdUtil) {

  function showHomeAd() {
    if(AdMob){//Because android need this on start up apparently
      var platform = Settings.getPlatformSettings();
      console.log('<GFF> HomeCtrl showHomeAd Banner AdUnit: ' + platform.developerBanner );
      AdUtil.showBannerAd( platform.developerBanner );
    }
  }

  $scope.$on('$ionicView.enter', showHomeAd );

  //Because view events do not appear to fire when the view first loads
  //Unfortuately adding this breaks the layout of the home page in a browser
  ionic.Platform.ready( showHomeAd );

  $scope.onOpenLink = function(element) {
    window.open(elem.href, '_system', 'location=yes');
    return false;
  }
});
