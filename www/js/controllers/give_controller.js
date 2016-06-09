controllers.controller('GiveCtrl', function($scope, Charities, Settings) {
  var charitiesByLocation = [];
  var activeLocations = Settings.getActiveLocations();

  console.log('<GFF> GiveCtrl activeLocations ' + JSON.stringify(activeLocations) );

  var len = activeLocations.length;
  for (var i = 0; i < len; i++) {
    var charitiesByLocation = charitiesByLocation.concat( Charities.getAllByLocation( activeLocations[i].id ) );
  }

  console.log('<GFF> GiveCtrl charitiesByLocation to display ' + JSON.stringify(charitiesByLocation) );

  $scope.charities = charitiesByLocation;
});
