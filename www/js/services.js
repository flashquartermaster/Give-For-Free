angular.module('starter.services', [])

.factory('Charities', function() {
  // Some fake testing data
  var charities = [{
    id: 0,
    name: 'Charity 1',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'A charity description'
  }, {
    id: 1,
    name: 'Charity 2',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'A charity description'
  }, {
    id: 2,
    name: 'Charity 3',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'A charity description'
  }, {
    id: 3,
    name: 'Charity 4',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'A charity description'
  }, {
    id: 4,
    name: 'Charity 5',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'A charity description'
  }, {
    id: 5,
    name: 'Charity 6',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'A charity description'
  }, {
    id: 6,
    name: 'Charity 7',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'A charity description'
  }, {
    id: 7,
    name: 'Charity 8',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'A charity description'
  }, {
    id: 8,
    name: 'Charity 9',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'A charity description'
  }, {
    id: 9,
    name: 'Charity 10',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'A charity description'
  }, {
    id: 10,
    name: 'Charity 11',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'A charity description'
  }, {
    id: 11,
    name: 'Charity 12',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'A charity description'
  }, {
    id: 12,
    name: 'Charity 13',
    thumbnail: 'img/breast_cancer.png',
    url: 'https://www.breastcancercare.org.uk/',
    description: 'A charity description'
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
