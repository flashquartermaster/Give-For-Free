controllers.controller('AppCtrl', function($scope, $ionicHistory, $state, $ionicPopup, ConnectivityMonitor) {

  ionic.on(ConnectivityMonitor.networkChangedEventName, function(event){

    var isOffline = ConnectivityMonitor.isOffline();
    if( isOffline ){
      alertJson = {
        title:'Offline',
        template: 'You have gone offline, \'Give For Free\' will not be able to work correctly'};
    } else {
      alertJson = {
        title:'Online',
        template: 'Give For Free has come back online'};
    }

    var alertPopup = $ionicPopup.alert( alertJson );

    if( !isOffline){
      alertPopup.then(function(response){
        $ionicHistory.clearCache([$state.current.name]).then(function() {
          $state.reload();
        });
      });
    }
  }, window);
});
