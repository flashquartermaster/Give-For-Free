services.factory('Charities', function() {
  // Some fake testing data
  var charities = [{
    id: 0,
    disbaled: false,
    name: 'Charity 1',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
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
    disbaled: false,
    name: 'Charity 2',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
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
    disbaled: false,
    name: 'Charity 3',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
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
    disbaled: false,
    name: 'Charity 4',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
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
    disbaled: false,
    name: 'Charity 5',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
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
    disbaled: false,
    name: 'Charity 6',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
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
    disbaled: false,
    name: 'Charity 7',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
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
    disbaled: false,
    name: 'Charity 8',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
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
    disbaled: false,
    name: 'Charity 9',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
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
    disbaled: false,
    name: 'Charity 10',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
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
    disbaled: false,
    name: 'Charity 11',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
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
    disbaled: false,
    name: 'Charity 12',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
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
    disbaled: false,
    name: 'Charity 13',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel gravida sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In laoreet efficitur nunc euismod lacinia.',
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
  }];

  return {

    all: function() {
      return charities;
    },

    /*remove: function(chat) {
      charities.splice(chats.indexOf(charities), 1);
    },*/

    get: function(charityId) {
      var arrayLength = charities.length;
      for (var i = 0; i < arrayLength; i++) {
        if (charities[i].id === parseInt(charityId)) {
          return charities[i];
        }
      }
      return null;
    },

    getBannerAdvert: function( adverts ){
      var advertsArrayLength = adverts.length

      for (var i = 0; i < advertsArrayLength; i++) {
        if ( ionic.Platform.platform() == adverts[i].id ){
          return adverts[i].banner;
        }
      }

      return null;
    },

    getFullScreenAdvert: function( adverts ){
      var advertsArrayLength = adverts.length

      for (var i = 0; i < advertsArrayLength; i++) {
        if ( ionic.Platform.platform() == adverts[i].id ){
          return adverts[i].interstitial;
        }
      }

      return null;
    }

  };
});
