angular.module('starter.services', [])

.factory('AdUtil', function(){
  return {
    showBannerAd: function (bannerId){
      console.log('<GFF> AdUtil showBannerAd AdUnit: ', bannerId);

      AdMob.removeBanner();
      AdMob.createBanner( {
        adId: bannerId,
        isTesting: true,//Global testing switch
        overlap: false,
        offsetTopBar: false,
        adSize:'SMART_BANNER',
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        overlap:false,
        bgColor: 'black',
        autoShow: true,
      });
    },
    showInterstitialAd: function(interstitialId){
      console.log('<GFF> AdUtil showInterstitialAd AdUnit: ', interstitialId);
      AdMob.removeBanner();//In case we have just switched from banner ads
      AdMob.prepareInterstitial({
        adId: interstitialId,
        autoShow: true,
        isTesting: true//Global testing switch
      });
    }
  }
})

.factory('Settings', function($localStorage){

  return {
    getPlatformSettings: function() {
      if (/(ipod|iphone|ipad)/i.test(navigator.userAgent) ){
        return $localStorage.platformSettings[0];
      } else if( /(android)/i.test(navigator.userAgent) ) {
        return $localStorage.platformSettings[1];
      } else {
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
            id: 'wp8',
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
})

.factory('Charities', function() {
  // Some fake testing data
  var charities = [{
    id: 0,
    name: 'Charity 1',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    /*initial data for ios only*/
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/4111177630'
  }, {
    id: 1,
    name: 'Charity 2',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/4111177630'
  }, {
    id: 2,
    name: 'Charity 3',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/4111177630'
  }, {
    id: 3,
    name: 'Charity 4',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/4111177630'
  }, {
    id: 4,
    name: 'Charity 5',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/4111177630'
  }, {
    id: 5,
    name: 'Charity 6',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/4111177630'
  }, {
    id: 6,
    name: 'Charity 7',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/4111177630'
  }, {
    id: 7,
    name: 'Charity 8',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/4111177630'
  }, {
    id: 8,
    name: 'Charity 9',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/4111177630'
  }, {
    id: 9,
    name: 'Charity 10',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/4111177630'
  }, {
    id: 10,
    name: 'Charity 11',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/4111177630'
  }, {
    id: 11,
    name: 'Charity 12',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/4111177630'
  }, {
    id: 12,
    name: 'Charity 13',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/4111177630'
  }];

  return {

    all: function() {
      return charities;
    },

    /*remove: function(chat) {
      charities.splice(chats.indexOf(charities), 1);
    },*/

    get: function(charityId) {
      for (var i = 0; i < charities.length; i++) {
        if (charities[i].id === parseInt(charityId)) {
          return charities[i];
        }
      }
      return null;
    }

  };
})

.factory('ConnectivityMonitor', function($rootScope, $cordovaNetwork){

  return {
    networkChangedEventName: 'gffNetworkChanged',
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
            console.log("<GFF> startWatching $cordovaNetwork:online went online");
            ionic.trigger('gffNetworkChanged');
          });

          $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            console.log("<GFF> startWatching $cordovaNetwork:online went offline");
            ionic.trigger('gffNetworkChanged');
          });

        } else {

          window.addEventListener("online", function(e) {
            console.log("<GFF> startWatching window.addEventListener went online");
            ionic.trigger('gffNetworkChanged');
          }, false);

          window.addEventListener("offline", function(e) {
            console.log("<GFF> startWatching window.addEventListener went offline");
            ionic.trigger('gffNetworkChanged');
          }, false);
        }
    }
  }
});
