services.factory('Charities', function(Settings) {

  return {

    all: function() {
      return Ionic.User.current().get('charities');
    },

    getEnabledCharitiesFromCurrentLocations: function(){
      var activeLocations = Settings.getActiveLocations();
      //Iterate over active locations to find charities
      //that are in that locale and are not disabled
      var charities = this.all()
      charitiesLen = charities.length,
      enabledCharitiesByLocation = [],
      activeLocationsLen = activeLocations.length;


      for (var i = 0; i < activeLocationsLen; i++) {
        for (var j = 0; j < charitiesLen; j++) {
          if( charities[j].locationId == activeLocations[i].id && !charities[j].disabled ){
            enabledCharitiesByLocation.push( charities[j] );
          }
        }
      }

      return enabledCharitiesByLocation;
    },

    getPreviousCharityId: function( charityId ){
      var charities = this.getEnabledCharitiesFromCurrentLocations();
      var len = charities.length;
      for (var i = 0; i < len; i++) {
        if (charities[i].id === parseInt(charityId)) {
          if( charities[i-1] ){
            return charities[i-1].id;
          }
        }
      }
      return charities[len-1].id;//go round in a circle
    },

    getNextCharityId: function( charityId ){
      var charities = this.getEnabledCharitiesFromCurrentLocations();
      var len = charities.length;
      for (var i = 0; i < len; i++) {
        if (charities[i].id === parseInt(charityId)) {
          if( charities[i+1] ){
            return charities[i+1].id;
          }
        }
      }
      return charities[0].id;//go round in a circle
    },

    get: function( charityId ) {
      var charities = this.all()
      var len = charities.length;
      for (var i = 0; i < len; i++) {
        if (charities[i].id === parseInt(charityId)) {
          return charities[i];
        }
      }
      return null;
    },

    getBannerAdvert: function( charityAdverts ){
      var len = charityAdverts.length
      for (var i = 0; i < len; i++) {
        if ( ionic.Platform.platform() == charityAdverts[i].id ){
          return charityAdverts[i].banner;
        }
      }

      return null;
    },

    getFullScreenAdvert: function( charityAdverts ){
      var len = charityAdverts.length
      for (var i = 0; i < len; i++) {
        if ( ionic.Platform.platform() == charityAdverts[i].id ){
          return charityAdverts[i].interstitial;
        }
      }

      return null;
    },

    reorder: function( toMoveId, toMoveToId ){
      var charities = this.all()
      var len = charities.length, i, toMoveIndex, toMoveToIndex;
      for (i = 0; i < len; i++) {
        if( charities[i].id == toMoveId ){
          toMoveIndex = i;
        }
        if( charities[i].id == toMoveToId ){
          toMoveToIndex = i;
        }
        if(!isNaN(toMoveIndex) && !isNaN(toMoveToIndex) ){//variables assigned so stop work
          break;
        }
      }
      charities.move(toMoveIndex, toMoveToIndex);
    },

    prepareForSave: function(){
      Settings.prepareSettingsForSave();
    },

    getInitialCharities: function(){
      return [{
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
    }

  };
});
