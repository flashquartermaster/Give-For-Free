controllers.controller('GiveCtrl', function($scope, Charities, Settings) {

  function updateView(){
    var charitiesByLocation = [];
    var activeLocations = Settings.getActiveLocations();

    var len = activeLocations.length;
    for (var i = 0; i < len; i++) {
      charitiesByLocation = charitiesByLocation.concat( Charities.getAllByLocation( activeLocations[i].id ) );
    }

    $scope.charities = charitiesByLocation;
  }

  $scope.$on('$ionicView.beforeEnter', updateView );
});
