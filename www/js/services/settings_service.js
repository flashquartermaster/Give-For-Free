services.factory('Settings', function($localStorage, $rootScope){

  console.log('<GFF> Settings: Platform: ' + ionic.Platform.platform());

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
      var len = adTypes.length;
      for (var i = 0; i < len; i++) {
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
        if( locations[i].isOn ){
          ret.push( locations[i] );
        }
      }
      return ret;
    },

    isShowingDeveloperAd: function(){
      return $rootScope.isShowingDeveloperAd;
    },

    showingDeveloperAd: function( bool ){
      //console.log('<GFF> Settings: showingDeveloperAd set to ' + bool);
      $rootScope.isShowingDeveloperAd = bool;
    },

    setDefaultSettings: function(){

      $localStorage.$default({
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
          }],

          charities: [{
            id: 0,
            disabled: false,
            name: 'Charity 1',
            thumbnail: 'img/breast_cancer.png',
            url: 'https://www.breastcancercare.org.uk/',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
            locationId: 'world',
            adverts: [{
              id: 'ios',
              banner: 'ca-app-pub-9425381356824619/6786736033',
              interstitial: 'ca-app-pub-9425381356824619/4111177630'
            }, {
              id: 'android',
              banner: 'ca-app-pub-9425381356824619/2018459236',
              interstitial: 'ca-app-pub-9425381356824619/5587910831'
            }, {
              id: 'windows',
              banner: 'ca-app-pub-9425381356824619/4897873639',
              interstitial: 'ca-app-pub-9425381356824619/7064644039'
            }]
          }, {
            id: 1,
            disabled: false,
            name: 'Charity 2',
            thumbnail: 'img/breast_cancer.png',
            url: 'https://www.breastcancercare.org.uk/',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
            locationId: 'world',
            adverts: [{
              id: 'ios',
              banner: 'ca-app-pub-9425381356824619/6786736033',
              interstitial: 'ca-app-pub-9425381356824619/4111177630'
            }, {
              id: 'android',
              banner: 'ca-app-pub-9425381356824619/2018459236',
              interstitial: 'ca-app-pub-9425381356824619/5587910831'
            }, {
              id: 'windows',
              banner: 'ca-app-pub-9425381356824619/4897873639',
              interstitial: 'ca-app-pub-9425381356824619/7064644039'
            }]
          }, {
            id: 2,
            disabled: false,
            name: 'Charity 3',
            thumbnail: 'img/breast_cancer.png',
            url: 'https://www.breastcancercare.org.uk/',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
            locationId: 'world',
            adverts: [{
              id: 'ios',
              banner: 'ca-app-pub-9425381356824619/6786736033',
              interstitial: 'ca-app-pub-9425381356824619/4111177630'
            }, {
              id: 'android',
              banner: 'ca-app-pub-9425381356824619/2018459236',
              interstitial: 'ca-app-pub-9425381356824619/5587910831'
            }, {
              id: 'windows',
              banner: 'ca-app-pub-9425381356824619/4897873639',
              interstitial: 'ca-app-pub-9425381356824619/7064644039'
            }]
          }, {
            id: 3,
            disabled: false,
            name: 'Charity 4',
            thumbnail: 'img/breast_cancer.png',
            url: 'https://www.breastcancercare.org.uk/',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
            locationId: 'world',
            adverts: [{
              id: 'ios',
              banner: 'ca-app-pub-9425381356824619/6786736033',
              interstitial: 'ca-app-pub-9425381356824619/4111177630'
            }, {
              id: 'android',
              banner: 'ca-app-pub-9425381356824619/2018459236',
              interstitial: 'ca-app-pub-9425381356824619/5587910831'
            }, {
              id: 'windows',
              banner: 'ca-app-pub-9425381356824619/4897873639',
              interstitial: 'ca-app-pub-9425381356824619/7064644039'
            }]
          }, {
            id: 4,
            disabled: false,
            name: 'Charity 5',
            thumbnail: 'img/breast_cancer.png',
            url: 'https://www.breastcancercare.org.uk/',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
            locationId: 'world',
            adverts: [{
              id: 'ios',
              banner: 'ca-app-pub-9425381356824619/6786736033',
              interstitial: 'ca-app-pub-9425381356824619/4111177630'
            }, {
              id: 'android',
              banner: 'ca-app-pub-9425381356824619/2018459236',
              interstitial: 'ca-app-pub-9425381356824619/5587910831'
            }, {
              id: 'windows',
              banner: 'ca-app-pub-9425381356824619/4897873639',
              interstitial: 'ca-app-pub-9425381356824619/7064644039'
            }]
          }, {
            id: 5,
            disabled: false,
            name: 'Charity 6',
            thumbnail: 'img/breast_cancer.png',
            url: 'https://www.breastcancercare.org.uk/',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
            locationId: 'world',
            adverts: [{
              id: 'ios',
              banner: 'ca-app-pub-9425381356824619/6786736033',
              interstitial: 'ca-app-pub-9425381356824619/4111177630'
            }, {
              id: 'android',
              banner: 'ca-app-pub-9425381356824619/2018459236',
              interstitial: 'ca-app-pub-9425381356824619/5587910831'
            }, {
              id: 'windows',
              banner: 'ca-app-pub-9425381356824619/4897873639',
              interstitial: 'ca-app-pub-9425381356824619/7064644039'
            }]
          }, {
            id: 6,
            disabled: false,
            name: 'Charity 7',
            thumbnail: 'img/breast_cancer.png',
            url: 'https://www.breastcancercare.org.uk/',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
            locationId: 'world',
            adverts: [{
              id: 'ios',
              banner: 'ca-app-pub-9425381356824619/6786736033',
              interstitial: 'ca-app-pub-9425381356824619/4111177630'
            }, {
              id: 'android',
              banner: 'ca-app-pub-9425381356824619/2018459236',
              interstitial: 'ca-app-pub-9425381356824619/5587910831'
            }, {
              id: 'windows',
              banner: 'ca-app-pub-9425381356824619/4897873639',
              interstitial: 'ca-app-pub-9425381356824619/7064644039'
            }]
          }, {
            id: 7,
            disabled: false,
            name: 'Charity 8',
            thumbnail: 'img/breast_cancer.png',
            url: 'https://www.breastcancercare.org.uk/',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
            locationId: 'uk',
            adverts: [{
              id: 'ios',
              banner: 'ca-app-pub-9425381356824619/6786736033',
              interstitial: 'ca-app-pub-9425381356824619/4111177630'
            }, {
              id: 'android',
              banner: 'ca-app-pub-9425381356824619/2018459236',
              interstitial: 'ca-app-pub-9425381356824619/5587910831'
            }, {
              id: 'windows',
              banner: 'ca-app-pub-9425381356824619/4897873639',
              interstitial: 'ca-app-pub-9425381356824619/7064644039'
            }]
          }, {
            id: 8,
            disabled: false,
            name: 'Charity 9',
            thumbnail: 'img/breast_cancer.png',
            url: 'https://www.breastcancercare.org.uk/',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
            locationId: 'uk',
            adverts: [{
              id: 'ios',
              banner: 'ca-app-pub-9425381356824619/6786736033',
              interstitial: 'ca-app-pub-9425381356824619/4111177630'
            }, {
              id: 'android',
              banner: 'ca-app-pub-9425381356824619/2018459236',
              interstitial: 'ca-app-pub-9425381356824619/5587910831'
            }, {
              id: 'windows',
              banner: 'ca-app-pub-9425381356824619/4897873639',
              interstitial: 'ca-app-pub-9425381356824619/7064644039'
            }]
          }, {
            id: 9,
            disabled: false,
            name: 'Charity 10',
            thumbnail: 'img/breast_cancer.png',
            url: 'https://www.breastcancercare.org.uk/',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
            locationId: 'uk',
            adverts: [{
              id: 'ios',
              banner: 'ca-app-pub-9425381356824619/6786736033',
              interstitial: 'ca-app-pub-9425381356824619/4111177630'
            }, {
              id: 'android',
              banner: 'ca-app-pub-9425381356824619/2018459236',
              interstitial: 'ca-app-pub-9425381356824619/5587910831'
            }, {
              id: 'windows',
              banner: 'ca-app-pub-9425381356824619/4897873639',
              interstitial: 'ca-app-pub-9425381356824619/7064644039'
            }]
          }, {
            id: 10,
            disabled: false,
            name: 'Charity 11',
            thumbnail: 'img/breast_cancer.png',
            url: 'https://www.breastcancercare.org.uk/',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
            locationId: 'uk',
            adverts: [{
              id: 'ios',
              banner: 'ca-app-pub-9425381356824619/6786736033',
              interstitial: 'ca-app-pub-9425381356824619/4111177630'
            }, {
              id: 'android',
              banner: 'ca-app-pub-9425381356824619/2018459236',
              interstitial: 'ca-app-pub-9425381356824619/5587910831'
            }, {
              id: 'windows',
              banner: 'ca-app-pub-9425381356824619/4897873639',
              interstitial: 'ca-app-pub-9425381356824619/7064644039'
            }]
          }, {
            id: 11,
            disabled: false,
            name: 'Charity 12',
            thumbnail: 'img/breast_cancer.png',
            url: 'https://www.breastcancercare.org.uk/',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
            locationId: 'uk',
            adverts: [{
              id: 'ios',
              banner: 'ca-app-pub-9425381356824619/6786736033',
              interstitial: 'ca-app-pub-9425381356824619/4111177630'
            }, {
              id: 'android',
              banner: 'ca-app-pub-9425381356824619/2018459236',
              interstitial: 'ca-app-pub-9425381356824619/5587910831'
            }, {
              id: 'windows',
              banner: 'ca-app-pub-9425381356824619/4897873639',
              interstitial: 'ca-app-pub-9425381356824619/7064644039'
            }]
          }, {
            id: 12,
            disabled: false,
            name: 'Charity 13',
            thumbnail: 'img/breast_cancer.png',
            url: 'https://www.breastcancercare.org.uk/',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
            locationId: 'uk',
            adverts: [{
              id: 'ios',
              banner: 'ca-app-pub-9425381356824619/6786736033',
              interstitial: 'ca-app-pub-9425381356824619/4111177630'
            }, {
              id: 'android',
              banner: 'ca-app-pub-9425381356824619/2018459236',
              interstitial: 'ca-app-pub-9425381356824619/5587910831'
            }, {
              id: 'windows',
              banner: 'ca-app-pub-9425381356824619/4897873639',
              interstitial: 'ca-app-pub-9425381356824619/7064644039'
            }]
          }]
      });
    }
  };
});
