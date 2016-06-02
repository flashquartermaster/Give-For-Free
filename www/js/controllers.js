angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, DeveloperSettings) {

  $scope.developerSettings = DeveloperSettings.get();

  $scope.$on('$ionicView.enter', function() {

    console.log('<GFF> Platform: ', $scope.developerSettings.id);

    AdMob.removeBanner();
    AdMob.createBanner( {
        adId: $scope.developerSettings.banner,
        isTesting: true,
        overlap: false,
        offsetTopBar: false,
        adSize:'SMART_BANNER',
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        overlap:false,
        bgColor: 'black',
        autoShow: true
    } );

    console.log('<GFF> Developer AdUnit: ', $scope.developerSettings.banner);

    /*AdMob.prepareInterstitial({
        adId: $scope.developerSettings.interstitial,
        autoShow: true
    });*/
  })

})

.controller('GiveCtrl', function($scope, Charities) {
  $scope.charities = Charities.all();
})

.controller('GiveDetailCtrl', function($scope, $stateParams, Charities ){

  $scope.charity = Charities.get($stateParams.charityId);

  $scope.$on('$ionicView.enter', function() {
      AdMob.removeBanner();
      AdMob.createBanner({
         adId: $scope.charity.banner,
         isTesting: true,
         offsetTopBar: true,
         adSize:'SMART_BANNER',
         position: AdMob.AD_POSITION.BOTTOM_CENTER,
         bgColor: 'black',
         autoShow: true,
         /*success: function(){
           //alert('New banner');
         },
         error: function(){
           //alert('failed to create banner');
         }*/
     });
     console.log('<GFF> Charity AdUnit: ', $scope.charity.banner);
  })
})

.controller('SettingsCtrl', function($scope) {});
