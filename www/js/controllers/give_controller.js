controllers.controller('GiveCtrl', function($scope, Charities) {
  $scope.charities = Charities.all();
});
