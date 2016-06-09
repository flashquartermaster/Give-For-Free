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

    isBannerAd: function(){
      var adTypes = $localStorage.adTypes;
      var arrayLength = adTypes.length;
      for (var i = 0; i < arrayLength; i++) {
          if( adTypes[i].isOn  ){
            return adTypes[i].id == 'banner';
          }
      }
      return false;
    },

    getLocations: function(){
      return $localStorage.locations;
    },

    getActiveLocations: function(){
      var locations = $localStorage.locations;
      var ret = [];
      var len = locations.length;
      for (var i = 0; i < len; i++) {
        console.log('<GFF> Settings getActiveLocations ' + JSON.stringify(locations[i]));
        if( locations[i].isOn ){
          ret.push( locations[i] );
        }
      }
      return ret;
    },

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
            id: 'banner',
            name: 'Banner',
            isOn: true
          },{
            id: 'interstitial',
            name: 'Full Screen',
            isOn: false
          }],

          locations: [{
            id: 'world',
            name:'World',
            isOn: true
          },{
            id: 'uk',
            name:'Uk',
            isOn: false
          }]
      });
    }
  };
});
