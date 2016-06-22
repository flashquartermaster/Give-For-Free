controllers.controller('AppCtrl', function($scope, $ionicHistory, $state, $ionicPopup, $ionicLoading, ConnectivityMonitor, EVENTS) {

  ionic.on(EVENTS.networkChanged, function(event){

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

  ionic.on(EVENTS.adRequest, function(){
    $ionicLoading.show({
      template: '<p>Loading Advert...</p><ion-spinner icon=\'ripple\' class=\'spinner-light\'></ion-spinner>'
    });
  });

  document.addEventListener('onAdLoaded', function(data){
    $ionicLoading.hide();
  });

  document.addEventListener('onAdFailLoad',function(data){
    $ionicLoading.hide();

    $ionicPopup.alert({
      title: 'Error',
      template: 'There was an error loading the advert ' + data.error + ' , ' + data.reason + '.'
    });

    /*
    var confirmPopup = $ionicPopup.confirm({
      title:'Error',
      template: 'Adverts failed to load ' + data.error + ',' + data.reason + ' would you like to report this problem'
      });

      confirmPopup.then(function(res) {
         if(res) {
            //Do error reporting
         }
      });
      */
  });

  //Tiggered when interstitial is showing
  /*document.addEventListener('onAdPresent',function(data){
  });

  document.addEventListener('onAdDismiss', function(data){
  });*/

});
