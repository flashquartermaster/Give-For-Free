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

  $scope.onEmailTap = function(){
    window.open('mailto:support@giveforfreeonline.org', '_system', 'location=yes');  return false;
  }

  $scope.onFacebookTap = function(){
    window.open('https://www.facebook.com/Give-For-Free-643061692510804/', '_system', 'location=yes');  return false;
  }

  $scope.onTwitterTap = function(){
    window.open('https://twitter.com/_giveforfree_', '_system', 'location=yes');  return false;
  }
});
