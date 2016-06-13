controllers.controller('GiveCtrl', function($scope, $ionicPopover, Charities, Settings) {

  $scope.isEditing = false;

  function onBeforeEnter(){
    var charitiesByLocation = [];
    var activeLocations = Settings.getActiveLocations();

    var len = activeLocations.length, i;
    for (i = 0; i < len; i++) {
      charitiesByLocation = charitiesByLocation.concat( Charities.getAllByLocation( activeLocations[i].id ) );
    }

    $scope.charities = charitiesByLocation;
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

  $scope.onMoreTap = function( $event, charity ){
    $scope.popoverCharity = charity;
    $scope.popover.show($event);
  }

  $scope.onEditToggle = function(){
    $scope.isEditing = !$scope.isEditing;
  }
})
//Filter for collection-repeat for grid
.filter('removeDisabledItems', function($parse) {

    return function(input, isEditing) {
        if (!input || !input.length) return;
        if( !isEditing ){
          var output = [];
          for (var i = 0, ii = input.length; i < ii && (item = input[i]); i++) {
              if( !item.disabled ){
                output.push(item);
              }
          }
          return output;
        }
        return input;
    };
});
