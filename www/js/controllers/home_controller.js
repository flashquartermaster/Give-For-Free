controllers.controller('HomeCtrl', function($scope, $state, Settings, AdUtil) {

  function onViewEnter() {
    if(AdMob){//Because android need this on start up apparently
      var platform = Settings.getPlatformSettings();
      console.log('<GFF> HomeCtrl showHomeAd Banner AdUnit: ' + platform.developerBanner );
      AdUtil.showBannerAd( platform.developerBanner );
    }
  }

  $scope.$on('$ionicView.enter', onViewEnter );

  $scope.onOpenLink = function(element) {
    window.open(element.href, '_system', 'location=yes');
    return false;
  }

  $scope.doLogOut = function(){
    Ionic.Auth.logout();
    $state.go('login');
  }
});
