angular.module('starter.services', [])

.factory('AdUtil', function(){
  return {
    showBannerAd: function (bannerId){
      console.log('<GFF> GLOBAL showBannerAd AdUnit: ', bannerId);

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
    }

    /*showInterstitialAd: function(interstitialId){
    AdMob.prepareInterstitial({
          adId: interstitialId,
          autoShow: true
      });

    }*/
  }
})

.factory('Settings', function($localStorage){

  //window.localStorage.clear();

  $localStorage.$default({
      platformSettings: [{
        id: 'ios',
        banner: 'ca-app-pub-9425381356824619/4451731633',
        interstitial: 'ca-app-pub-9425381356824619/8219770039'
      }, {
        id: 'android',
        banner: 'ca-app-pub-9425381356824619/5928464836',
        interstitial: 'ca-app-pub-9425381356824619/3510368838'
      }, {
        id: 'wp8',
        banner: 'ca-app-pub-9425381356824619/7405198034',
        interstitial: 'ca-app-pub-9425381356824619/6463835232'
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
    interstitial: 'ca-app-pub-9425381356824619/8219770039'
  }, {
    id: 1,
    name: 'Charity 2',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/8219770039'
  }, {
    id: 2,
    name: 'Charity 3',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/8219770039'
  }, {
    id: 3,
    name: 'Charity 4',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/8219770039'
  }, {
    id: 4,
    name: 'Charity 5',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/8219770039'
  }, {
    id: 5,
    name: 'Charity 6',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/8219770039'
  }, {
    id: 6,
    name: 'Charity 7',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/8219770039'
  }, {
    id: 7,
    name: 'Charity 8',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/8219770039'
  }, {
    id: 8,
    name: 'Charity 9',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/8219770039'
  }, {
    id: 9,
    name: 'Charity 10',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/8219770039'
  }, {
    id: 10,
    name: 'Charity 11',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/8219770039'
  }, {
    id: 11,
    name: 'Charity 12',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/8219770039'
  }, {
    id: 12,
    name: 'Charity 13',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
    banner: 'ca-app-pub-9425381356824619/6786736033',
    interstitial: 'ca-app-pub-9425381356824619/8219770039'
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
});
