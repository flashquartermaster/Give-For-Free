angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('GiveCtrl', function($scope, Charities) {

  $scope.charities = Charities.all();

})

.controller('SettingsCtrl', function($scope) {});
