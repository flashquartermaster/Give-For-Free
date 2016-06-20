services.factory('AdUtil', function( Settings ){
  Settings.showingDeveloperAd( false );

  return {
    showBannerAd: function (adId){
      var platform = Settings.getPlatformSettings();

      console.log('<GFF> AdUtil showBannerAd AdUnit: ' + adId );
      /*+ ', dev ad ' + platform.developerBanner
      + ', isShowingDeveloperAd ' + Settings.isShowingDeveloperAd()
      + ', ad is dev ad ' + ( adId == platform.developerBanner )
      + ', ' + ( adId == platform.developerBanner && Settings.isShowingDeveloperAd()) );*/

      if( adId == platform.developerBanner && Settings.isShowingDeveloperAd() ){
        //if you are trying to show the home banner when it is already showing do nothing
      } else {
        console.log('<GFF> AdUtil showBannerAd');
        Settings.showingDeveloperAd( ( adId == platform.developerBanner ) );

        AdMob.removeBanner();
        AdMob.createBanner({
          adId: adId,
          //isTesting: true,//Global testing switch
          overlap: false,
          offsetTopBar: false,
          adSize:'SMART_BANNER',
          position: AdMob.AD_POSITION.BOTTOM_CENTER,
          overlap:false,
          bgColor: 'black',
          autoShow: true,
        });

        ionic.trigger('gffOnAdRequest');
      }


    },

    showInterstitialAd: function(adId){
      console.log('<GFF> AdUtil showInterstitialAd AdUnit: ' + adId);
      Settings.showingDeveloperAd( false );

      AdMob.removeBanner();//In case we have just switched from banner ads
      AdMob.prepareInterstitial({
        adId: adId,
        //isTesting: true,//Global testing switch
        autoShow: true
      });
      ionic.trigger('gffOnAdRequest');
    }

  }
});
