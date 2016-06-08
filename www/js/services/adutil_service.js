services.factory('AdUtil', function(){
  return {
    showBannerAd: function (bannerId){
      console.log('<GFF> AdUtil showBannerAd AdUnit: ' + bannerId);

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
      ionic.trigger('gffOnAdRequest');
    },

    showInterstitialAd: function(interstitialId){
      console.log('<GFF> AdUtil showInterstitialAd AdUnit: ' + interstitialId);
      AdMob.removeBanner();//In case we have just switched from banner ads
      AdMob.prepareInterstitial({
        adId: interstitialId,
        isTesting: true,//Global testing switch
        autoShow: true
      });
      ionic.trigger('gffOnAdRequest');
    }

  }
});
