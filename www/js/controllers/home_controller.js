controllers.controller('HomeCtrl', function($scope, Settings, AdUtil) {

  function showHomeAd() {
    if(AdMob){//Because android need this on start up apparently
      var platform = Settings.getPlatformSettings();
      console.log('<GFF> HomeCtrl showHomeAd Banner AdUnit: ' + platform.developerBanner );
      AdUtil.showBannerAd( platform.developerBanner );
    }
  }

  $scope.$on('$ionicView.enter', showHomeAd );

  ionic.Platform.ready( showHomeAd );//Because view events do not appear to fire when the view first loads

  $scope.onEmailTap = function(){
    window.open('mailto:support@giveforfree.co.uk', '_system', 'location=yes');  return false;
  }

  $scope.onFacebookTap = function(){
    window.open('http://www.facebook.com', '_system', 'location=yes');  return false;
  }

  $scope.onTwitterTap = function(){
    window.open('http://www.twitter.com', '_system', 'location=yes');  return false;
  }
});
