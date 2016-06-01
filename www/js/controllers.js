angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('GiveCtrl', function($scope, Charities) {
  $scope.charities = Charities.all();
})

.controller('GiveDetailCtrl', function($scope, $stateParams, Charities ){
  $scope.charity = Charities.get($stateParams.charityId);
})

.controller('SettingsCtrl', function($scope) {});
