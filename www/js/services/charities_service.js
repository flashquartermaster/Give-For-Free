services.factory('Charities', function($localStorage) {

  return {

    all: function() {
      return $localStorage.charities;
    },

    getAllByLocation: function( locationId ){
      var ret = [];
      var charities = $localStorage.charities;
      var len = charities.length;
      for (var i = 0; i < len; i++) {
        if( charities[i].locationId == locationId ){
          ret.push( charities[i] );
        }
      }
      return ret;
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

    reorder: function( charityId, toIndex ){
      var charities = $localStorage.charities;
      var len = charities.length, charityIndex, i;
      for (i = 0; i < len; i++) {
        if( charities[i].id == charityId ){
          charityIndex = i;
          break;
        }
      }

      console.log('<GFF> CharityService: reorder : charityId ' + charityId + ', at index ' + charityIndex + ', to ' + toIndex);

      console.log('<GFF> CharityService: reorder: chosen charity at ' + charityIndex+', '  + JSON.stringify(charities[charityIndex]) );

      charities.move(charityIndex, toIndex);

      console.log('<GFF> CharityService: reorder: now at ' + toIndex + ', ' + JSON.stringify(charities[toIndex]) );

      //console.log('<GFF> CharityService: reorder: all '  + JSON.stringify(charities) );
    }

  };
});
