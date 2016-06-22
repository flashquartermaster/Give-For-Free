services.factory('ConnectivityMonitor', function($rootScope, $cordovaNetwork, EVENTS){

  return {
    isOnline: function(){
      if(ionic.Platform.isWebView()){
        return $cordovaNetwork.isOnline();
      } else {
        return navigator.onLine;
      }
    },
    isOffline: function(){
      if(ionic.Platform.isWebView()){
        return !$cordovaNetwork.isOnline();
      } else {
        return !navigator.onLine;
      }
    },
    startWatching: function(){
        if(ionic.Platform.isWebView()){

          $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
            console.log("<GFF> ConnectivityMonitor: startWatching $cordovaNetwork:online went online");
            ionic.trigger(EVENTS.networkChanged);
          });

          $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            console.log("<GFF> ConnectivityMonitor: startWatching $cordovaNetwork:online went offline");
            ionic.trigger(EVENTS.networkChanged);
          });

        } else {

          window.addEventListener("online", function(e) {
            console.log("<GFF> ConnectivityMonitor: startWatching window.addEventListener went online");
            ionic.trigger(EVENTS.networkChanged);
          }, false);

          window.addEventListener("offline", function(e) {
            console.log("<GFF> ConnectivityMonitor: startWatching window.addEventListener went offline");
            ionic.trigger(EVENTS.networkChanged);
          }, false);
        }
    }
  }
});
