services.factory('ConnectivityMonitor', function($rootScope, $cordovaNetwork){

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
            ionic.trigger('gffNetworkChanged');
          });

          $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            console.log("<GFF> ConnectivityMonitor: startWatching $cordovaNetwork:online went offline");
            ionic.trigger('gffNetworkChanged');
          });

        } else {

          window.addEventListener("online", function(e) {
            console.log("<GFF> ConnectivityMonitor: startWatching window.addEventListener went online");
            ionic.trigger('gffNetworkChanged');
          }, false);

          window.addEventListener("offline", function(e) {
            console.log("<GFF> ConnectivityMonitor: startWatching window.addEventListener went offline");
            ionic.trigger('gffNetworkChanged');
          }, false);
        }
    }
  }
});
