controllers.controller('HomeCtrl', function($scope, $state, $rootScope, $ionicHistory, Settings, AdUtil, User) {

  $scope.firstname = '';

  function onViewEnter(event, data) {
    console.log('<GFF> HomeCtrl: onViewEnter: recovered password: ' + $rootScope.hasRequestedNewPassword );

    if( $rootScope.hasRequestedNewPassword)
    {
      $ionicHistory.nextViewOptions({
         disableAnimate: true
      });
      $state.go('tab.change-password');
    } else {
      var user = Ionic.User.current();

      //console.log('<GFF> HomeCtrl: onViewEnter: user: ' + JSON.stringify( user ) );

      $scope.isAvatar = User.isSocialUser();
      $scope.avatar_url = user.details.image;
      $scope.firstname = user.details.name.split(" ")[0];

      if(AdMob){//Because android need this on start up apparently
        var platform = Settings.getPlatformSettings();
        console.log('<GFF> HomeCtrl showHomeAd Banner AdUnit: ' + platform.developerBanner );
        AdUtil.showBannerAd( platform.developerBanner );
      }
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
