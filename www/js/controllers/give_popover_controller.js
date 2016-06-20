controllers.controller('GivePopOverCtrl', function($scope, Scopes) {

  $scope.data = {};
  $scope.data.isReordering = Scopes.get('GiveCtrl').isReordering;
  $scope.data.isDisabledItems = Scopes.get('GiveCtrl').isDisabledItems;
  $scope.data.isSearch = Scopes.get('GiveCtrl').isSearch;

  $scope.onPopoverReorderToggle = function(){
    //$scope.popover and $scope.isReordering are set in GiveCtrl so why the fuck I can get at the
    //popover and not the other vaiables is a mystery to me. I can pop the scope into the creation of the popover
    //and the variables are readable but not updateable
    //Also due to some mysterious prototyping issue in javascript the variables have to go inside an object
    //data in this case
    if( Scopes.get('GiveCtrl').isSearch ){
      Scopes.get('GiveCtrl').isSearch = $scope.data.isSearch = false
    }
    Scopes.get('GiveCtrl').isReordering = !Scopes.get('GiveCtrl').isReordering;
    //$scope.popover.hide();
  }

  $scope.onPopoverDisableToggle = function(){
    Scopes.get('GiveCtrl').isDisabledItems = !Scopes.get('GiveCtrl').isDisabledItems;
  }

  $scope.onPopoverSearchToggle = function(){
    if( Scopes.get('GiveCtrl').isReordering ){
      Scopes.get('GiveCtrl').isReordering = $scope.data.isReordering = false
    }
    Scopes.get('GiveCtrl').isSearch = !Scopes.get('GiveCtrl').isSearch;
  }

});
