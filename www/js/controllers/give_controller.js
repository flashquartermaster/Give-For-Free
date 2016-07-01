controllers.controller('GiveCtrl', function($scope, $ionicPopover, $ionicScrollDelegate, Charities, Settings, Scopes) {
  Scopes.store('GiveCtrl', $scope);

  //These itrems are all manipulated from the popover
  $scope.isReordering = false;
  $scope.isDisabledItems = false;
  $scope.isSearch = false;

  function onBeforeEnter(event, data){
    $scope.activeLocations = Settings.getActiveLocations();
    $scope.charities = Charities.all();
    $ionicScrollDelegate.scrollTop();
  }

  $scope.$on('$ionicView.beforeEnter', onBeforeEnter );

  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });

  $ionicPopover.fromTemplateUrl('templates/give-popover.html')
  .then( function( popover ) {
    $scope.popover = popover;
  });

  $scope.onMoreTap = function( $event ){
    $scope.popover.show($event);
  }

  $scope.$watch(function(scope) { return scope.isDisabledItems },
                function(){
                  $ionicScrollDelegate.scrollTop();
                }
  );

  $scope.$watch(function(scope) { return scope.isSearch },
                function(){
                  angular.element( document.querySelector('#searchField') ).val('');
                  angular.element( document.querySelector('#searchField') ).triggerHandler('input');
                  $ionicScrollDelegate.scrollTop();
                }
  );

});
