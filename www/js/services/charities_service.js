services.factory('Charities', function($localStorage) {

  return {

    all: function() {
      return $localStorage.charities;
    },

    getEnabledCharities: function(){
      var charities = $localStorage.charities;
      var len = charities.length, enabledCharities = [];
      for (var i = 0; i < len; i++) {
        if( !charities[i].disabled ) {
          enabledCharities.push( charities[i] );
        }
      }
      return enabledCharities;
    },

    getPreviousCharityId: function( charityId ){
      var charities = this.getEnabledCharities();
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
      var charities = this.getEnabledCharities();
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
        //console.log('<GFF> CharityService: reorder : ' + charities[i].name);
        if( charities[i].id == toMoveId ){
          toMoveIndex = i;
          //console.log('<GFF> CharityService: reorder : move me: ' + charities[i].name + ', at: ' + toMoveIndex);
        }
        if( charities[i].id == toMoveToId ){
          toMoveToIndex = i;
          //console.log('<GFF> CharityService: reorder : move to: ' + charities[i].name + ', at: ' + toMoveToIndex);
        }
        if(!isNaN(toMoveIndex) && !isNaN(toMoveToIndex) ){//variables assigned so stop work
          //console.log('<GFF> CharityService: reorder : variables assigned');
          break;
        }
      }

      //console.log('<GFF> CharityService: reorder : move ' + charities[toMoveIndex].name + ', at index ' + toMoveIndex + ', to ' + toMoveToIndex);
      //console.log('<GFF> CharityService: reorder: chosen charity at ' + toMoveIndex + ', '  + JSON.stringify(charities[toMoveIndex]) );
      charities.move(toMoveIndex, toMoveToIndex);
      //console.log('<GFF> CharityService: reorder: now at ' + toMoveToIndex + ', ' + JSON.stringify(charities[toMoveToIndex]) );
    }

  };
});
