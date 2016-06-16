controllers.controller('GiveCtrl', function($scope, $ionicPopover, $ionicScrollDelegate, Charities, Settings, Scopes) {
  Scopes.store('GiveCtrl', $scope);

  $scope.isReordering = false;
  $scope.isDisabledItems = false;

  function onBeforeEnter(){
    $scope.activeLocations = Settings.getActiveLocations();
    $scope.charities = Charities.all();
    $ionicScrollDelegate.scrollTop();
  }

  $scope.$on('$ionicView.beforeEnter', onBeforeEnter );

  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });

  $scope.$on('popover.hidden', function() {
    $scope.popoverCharity = null;
  });

  $ionicPopover.fromTemplateUrl('templates/give-popover.html', {
    scope: $scope
  }).then( function( popover ) {
    $scope.popover = popover;
  });

  $scope.onMoreTap = function( $event ){
    $scope.popover.show($event);
  }

  $scope.onPopoverReorderToggle = function(){
    $scope.isReordering = !$scope.isReordering;
  }

  $scope.onPopoverDisableToggle = function(){
    $scope.isDisabledItems = !$scope.isDisabledItems;
    $ionicScrollDelegate.scrollTop();
  }

});
