angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('GiveCtrl', function($scope, Charities) {

  $scope.charities = Charities.all();

  $scope.remove = function(chat) {
    Charities.remove(chat);
  }
  
})

.controller('SettingsCtrl', function($scope) {});
