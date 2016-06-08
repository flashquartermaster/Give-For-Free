controllers.controller('SettingsCtrl', function($scope, Settings, $state, $ionicHistory) {
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
