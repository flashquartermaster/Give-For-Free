services.factory('Charities', function($localStorage) {

  return {

    all: function() {
      return $localStorage.charities;
    },

    getEnabledCharitiesFromCurrentLocations: function(){
      //get the active locations
      var locations = $localStorage.locations;
      var activeLocations = [];
      var locationsLen = locations.length;
      for (var i = 0; i < locationsLen; i++) {
        if( locations[i].isOn ){
          activeLocations.push( locations[i] );
        }
      }

      //Iterate over active locations to find charities
      //that are in that locale and are not disabled
      var charities = $localStorage.charities,
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
      var charities = $localStorage.charities;
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
      var charities = $localStorage.charities;
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
    }

  };
});
