controllers.controller('SettingsCtrl', function($scope, Settings, Charities, $state, $ionicHistory, $ionicPopup) {

  function onBeforeEnter(){
    $scope.platformSettings = Settings.getPlatformSettings();
    $scope.adTypes = Settings.getAdTypes();
    $scope.locations = Settings.getLocations();
  }

  $scope.$on('$ionicView.beforeEnter', onBeforeEnter );

  function userSaveSuccess( saveSuccess ) {
    console.log('<GFF> SettingsCtrl: updateUserSettings: userSaveSuccess: success: ' + JSON.stringify( saveSuccess.response.body.data.custom.settings ) );
  };

  function userSaveFailure( saveError ) {
    console.log('<GFF> SettingsCtrl: updateUserSettings: userSaveFailure: error: ' + JSON.stringify( saveError ) );

    var alertPopup = $ionicPopup.alert({
       title: 'Save Settings Error',
       template: '<p class="text-center">There was a problem saving your settings: ' + saveError.response.body.error.message + '</p>'
    });
  };

  function saveLocationChanges(){
    var user = Ionic.User.current();
    Settings.updateLocations( $scope.locations );
    user.save().then( userSaveSuccess, userSaveFailure );
  }

  function saveAdTypesChanges(){
    var user = Ionic.User.current();
    Settings.updateAdTypes( $scope.adTypes );
    user.save().then( userSaveSuccess, userSaveFailure );
  }

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

    saveAdTypesChanges();
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
         template: '<p class="text-center">If you switch off all the locations you will not be able to choose a charity to support</p>'
      });

      alertPopup.then( function(response) {
        var i;
        var len = $scope.locations.length;
        for(i = 0; i < len; i++){
          if ($scope.locations[i].id === adId){
            $scope.locations[i].isOn = true;
          }
        }
        saveLocationChanges();
      });
    } else {
      saveLocationChanges();
    }
  }

  $scope.clearAllData = function(){
    Ionic.Auth.logout();
    window.localStorage.clear();
    $state.go('login');
    window.location.reload();
  }

  $scope.resetUserSettings = function(){
    var user = Ionic.User.current();
    user.set('settings', Settings.getInitialSettings() );
    user.save().then( userSaveSuccess, userSaveFailure );
  }

  $scope.resetUserCharitiesData = function(){
    var user = Ionic.User.current();
    Settings.prepareForSave();
    user.set('charities', Charities.getInitialCharities() );
    user.save().then( userSaveSuccess, userSaveFailure );
  }
});
