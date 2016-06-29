services.factory('Settings', function($rootScope){

  console.log('<GFF> Settings: Platform: ' + ionic.Platform.platform());

  return {
    getSettings: function(){
      return Ionic.User.current().get('settings');
    },

    getPlatformSettings: function() {
      if ( ionic.Platform.platform() == 'ios' ){
        return this.getSettings().platformSettings[0];
      } else if( ionic.Platform.platform() == 'android' ) {
        return this.getSettings().platformSettings[1];
      } else if( ionic.Platform.platform() == 'windows'){
        return this.getSettings().platformSettings[2];
      }
      return null;
    },

    getAdTypes: function(){
      return this.getSettings().adTypes;
    },

    updateAdTypes: function( adTypes ){
      this.getSettings().adTypes = adTypes;
      this.prepareSettingsForSave();
    },

    isBannerAd: function(){
      var adTypes = this.getAdTypes();
      var len = adTypes.length;
      for (var i = 0; i < len; i++) {
          if( adTypes[i].isOn  ){
            return adTypes[i].id == 'banner';
          }
      }
      return false;
    },

    getLocations: function(){
      return this.getSettings().locations;
    },

    getActiveLocations: function(){
      var locations = this.getLocations();
      var ret = [];
      var len = locations.length;
      for (var i = 0; i < len; i++) {
        if( locations[i].isOn ){
          ret.push( locations[i] );
        }
      }
      return ret;
    },

    updateLocations: function( locations ){
      this.getSettings().locations = locations;
      this.prepareSettingsForSave();
    },

    prepareSettingsForSave: function(){
      //locations and adTypes have been manipulated by the scope and ion-toggles in the settings page
      //so they have a $$hashkey object reference in them
      //as a result we have to update our settings in order to strip out the $$hashkey and be able to save
      var user = Ionic.User.current();
      user.set('settings', JSON.parse( angular.toJson( user.get('settings'), false )))
    },

    isShowingDeveloperAd: function(){
      return $rootScope.isShowingDeveloperAd;
    },

    showingDeveloperAd: function( bool ){
      //console.log('<GFF> Settings: showingDeveloperAd set to ' + bool);
      $rootScope.isShowingDeveloperAd = bool;
    },

    getInitialSettings: function(){
      return {
          platformSettings: [{
            id: 'ios',
            developerBanner: 'ca-app-pub-9425381356824619/4451731633'
            //developerInterstitial: 'ca-app-pub-9425381356824619/8219770039'
          }, {
            id: 'android',
            developerBanner: 'ca-app-pub-9425381356824619/5928464836'
            //developerInterstitial: 'ca-app-pub-9425381356824619/3510368838'
          }, {
            id: 'windows',
            developerBanner: 'ca-app-pub-9425381356824619/7405198034'
            //developerInterstitial: 'ca-app-pub-9425381356824619/6463835232'
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
      };
    }
  };
});
