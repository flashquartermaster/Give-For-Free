services.factory('User', function(){

  return {
    isSocialUser: function (){
      return ( this.isTwitterUser() || this.isFacebookUser() || this.isGoogleUser() );
    },
    isTwitterUser: function(){
      console.log('<GFF> User: isTwitterUser: ' + Ionic.User.current().get('twitter_id'));
      return Ionic.User.current().get('twitter_id') !== null;
    },
    isFacebookUser: function(){
      console.log('<GFF> User: isFacebookUser: ' + Ionic.User.current().get('facebook_id'));
      return Ionic.User.current().get('facebook_id') !== null;
    },
    isGoogleUser: function(){
      console.log('<GFF> User: isGoogleUser: ' + Ionic.User.current().get('google_id'));
      return Ionic.User.current().get('google_id') !== null;
    }
  }

});
