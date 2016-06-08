services.factory('Settings', function($localStorage){
  console.log('<GFF> Platform: ' + ionic.Platform.platform());
  return {
    getPlatformSettings: function() {
      if ( ionic.Platform.platform() == 'ios' ){
        return $localStorage.platformSettings[0];
      } else if( ionic.Platform.platform() == 'android' ) {
        return $localStorage.platformSettings[1];
      } else if( ionic.Platform.platform() == 'windows'){
        return $localStorage.platformSettings[2];
      }
      return null;
    },

    getAdTypes: function(){
      return $localStorage.adTypes;
    },

    toggleAdType: function(){
      var adTypes = $localStorage.adTypes;
      var arrayLength = adTypes.length;
      for (var i = 0; i < arrayLength; i++) {
          adTypes[i].isOn = !adTypes[i].isOn;
      }
      $localStorage.adTypes = adTypes;
    },

    isBannerAd: function(){
      var adTypes = $localStorage.adTypes;
      var arrayLength = adTypes.length;
      for (var i = 0; i < arrayLength; i++) {
          if( adTypes[i].isOn  ){
            return adTypes[i].name == 'Banner';
          }
      }
      return false;
    },

    getLocations: function(){
      return $localStorage.locations;
    },
    /*
    setLocation: function(location,isOn){
      var locations = $localStorage.locations;
      if( isOn ){
        locations.push( location );
      } else {
        for( var item in locations ){
          if( item == location ){
            var index = locations.indexOf( item );
            locations.splice( index, 1 );
          }
        }
      }
      $localStorage.locations = locations;
    }*/

    setDefaultSettings: function(){

      $localStorage.$default({
          platformSettings: [{
            id: 'ios',
            developerBanner: 'ca-app-pub-9425381356824619/4451731633',
            developerInterstitial: 'ca-app-pub-9425381356824619/8219770039'
          }, {
            id: 'android',
            developerBanner: 'ca-app-pub-9425381356824619/5928464836',
            developerInterstitial: 'ca-app-pub-9425381356824619/3510368838'
          }, {
            id: 'windows',
            developerBanner: 'ca-app-pub-9425381356824619/7405198034',
            developerInterstitial: 'ca-app-pub-9425381356824619/6463835232'
          }],

          adTypes: [{
            id: 0,
            name: 'Banner',
            isOn: true
          },{
            id: 1,
            name: 'Full Screen',
            isOn: false
          }],

          locations: [{
            id: 0,
            name:'World',
            isOn: true
          },{
            id: 1,
            name:'Uk',
            isOn: false
          }]
      });
    }
  };
});
