controllers.controller('HomeCtrl', function($scope, Settings, AdUtil) {

  function showHomeAd() {
    var platform = Settings.getPlatformSettings();
    console.log('<GFF> HomeCtrl showHomeAd Banner AdUnit: ' + platform.developerBanner );
    AdUtil.showBannerAd( platform.developerBanner );
    //If ad is already developer ad dont show
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
});
