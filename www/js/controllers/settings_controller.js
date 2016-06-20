controllers.controller('SettingsCtrl', function($scope, Settings, $state, $ionicHistory, $ionicPopup) {
  $scope.platformSettings = Settings.getPlatformSettings();
  $scope.adTypes = Settings.getAdTypes();
  $scope.locations = Settings.getLocations();

  $scope.onAdTypeChange = function( adType ){
    //Radio function
    var len = $scope.adTypes.length, i;
    for (i = 0; i < len; i++) {
      if( adType.isOn ){//Switch on so switch the other one off
        if( $scope.adTypes[i].id != adType.id ){
          $scope.adTypes[i].isOn = false;
        }
      } else {//Switch off so swicth the other one on
        if( $scope.adTypes[i].id != adType.id ){
          $scope.adTypes[i].isOn = true;
        }
      }
    }
  }

  $scope.onLocationChange = function( adId ){
    var itemToggleStatus = [], i;
    var len = $scope.locations.length;
    for(i = 0; i < len; i++){
      if ($scope.locations[i].isOn === false){
        itemToggleStatus.push(i);
      }
    }

    if(itemToggleStatus.length === len){
      //All Off
      var alertPopup = $ionicPopup.alert({
         title: 'Locations',
         template: 'If you switch off all the locations you will not be able to choose a charity to support'
      });

      alertPopup.then(function(response) {
        var i;
        var len = $scope.locations.length;
        for(i = 0; i < len; i++){
          if ($scope.locations[i].id === adId){
            $scope.locations[i].isOn = true;
          }
        }
      });
    }
  }

  $scope.resetDefaults = function(){
    window.localStorage.clear();
    Settings.setDefaultSettings();
  }
});
