controllers.controller('SettingsCtrl', function($scope, Settings, $state, $ionicHistory) {
  $scope.platformSettings = Settings.getPlatformSettings();
  $scope.adTypes = Settings.getAdTypes();
  $scope.locations = Settings.getLocations();

  $scope.onAdTypeChange = function( adType ){
    //Radio function for checkboxes
    var arrayLength = $scope.adTypes.length;
    for (var i = 0; i < arrayLength; i++) {
      if( $scope.adTypes[i].id != adType.id ){
        $scope.adTypes[i].isOn = false;
      }
    }
  }

  $scope.resetDefaults = function(){
    window.localStorage.clear();
    Settings.setDefaultSettings();
  }
});
