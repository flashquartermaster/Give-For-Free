controllers.controller('GiveListCtrl', function($scope, $ionicPopup, $ionicListDelegate, Charities, Scopes) {
  function userSaveSuccess( saveSuccess ) {
    console.log('<GFF> GiveListCtrl: userSaveSuccess: success: ' + JSON.stringify( saveSuccess.response.body.data.custom.charities ) );
  };

  function userSaveFailure( saveError ) {
    console.log('<GFF> GiveListCtrl: userSaveFailure: error: ' + JSON.stringify( saveError ) );
    console.log('<GFF> GiveListCtrl: userSaveFailure: charities: ' + JSON.stringify(Ionic.User.current().get('settings')) );
    console.log('<GFF> GiveListCtrl: userSaveFailure: charities: ' + JSON.stringify(Ionic.User.current().get('charities')) );

    var alertPopup = $ionicPopup.alert({
       title: 'Save Changes Error',
       template: '<p class="text-center">There was a problem saving your changes: ' + saveError.response.body.error.message + '</p>'
    });
  };

  function saveCharitiesData(){
    var user = Ionic.User.current();
    Charities.prepareForSave();
    user.save().then( userSaveSuccess, userSaveFailure );
  }

  $scope.onToggleDisabled = function(item){
    /*console.log('<GFF> GiveListCtrl: onToggleDisabled: filteredCharities.length: '
    + $scope.filteredCharities.length + ', $scope.$parent.isDisabledItems: ' + $scope.$parent.isDisabledItems
    + ', Scopes.get(\'GiveCtrl\').isDisabledItems: ' + Scopes.get('GiveCtrl').isDisabledItems
    + ', Last item in disabled list: ' + ( $scope.filteredCharities.length == 1 && item.disabled));*/

    if( $scope.filteredCharities.length == 1 && item.disabled){
      //trying to remove the last item in the disabled list
      item.disabled = !item.disabled;
      //go back to main list
      Scopes.get('GiveCtrl').isDisabledItems = false;
      $ionicListDelegate.closeOptionButtons();

    } else if ( $scope.filteredCharities.length == 2 && !item.disabled ) {
      //Last item in the charity list. List length is 2 because there is a divider
      var alertPopup = $ionicPopup.alert({
         title: 'Charity List',
         template: 'You cannot disable all items in the list you must have at least one'
      });

      alertPopup.then(function(response) {
        $ionicListDelegate.closeOptionButtons();
      });

    } else {
      item.disabled = !item.disabled;
    }

    saveCharitiesData();
  }

  $scope.reorderItem = function(filteredCharities, fromIndex, toIndex) {
    var itemToMove = filteredCharities[fromIndex];
    var itemToReplace = filteredCharities[toIndex];
    //console.log('<GFF> GiveListCtrl: reorderItem: itemToMove: ' + itemToMove.name + ', from: ' + fromIndex);
    //console.log('<GFF> GiveListCtrl: reorderItem: itemToReplace: ' + itemToReplace.name + ', to: ' + toIndex);
    Charities.reorder( itemToMove.id, itemToReplace.id );

    saveCharitiesData();
  };

})
//Filter for collection-repeat for grid
.filter('disabledItemsFilter', function($parse) {
  return function(input, isDisabledItems) {
    if(!input || !input.length) return;

    //console.log('<GFF> GiveListCtrl: disabledItemsFilter: input.length: ' + input.length);

    var output = [], i, inputLength = input.length;
    for(i = 0; i < inputLength; i++){
      //console.log('<GFF> GiveListCtrl: removeDisabledItems: !isDisabledItems: ' + item.name + ', ' + item.disabled);
      if( (!isDisabledItems && !input[i].disabled)
      || (isDisabledItems && (input[i].disabled || input[i].isDivider ) ) ){
        output.push( input[i] );
      }
    }
    return output;
  };
})
//filter for collection-repeat to add location dividers and group items accordingly
.filter('locationFilter', function($parse){
  return function(input, activeLocations){
    if(!input || !input.length) return;

    //console.log('<GFF> GiveListCtrl: locationFilter: input.length: ' + input.length);

    var output = [], i, j, inputLength = input.length, locationsLength = activeLocations.length;
    for (i = 0; i < locationsLength; i++) {
      activeLocations[i].isDivider = true;
      output.push( activeLocations[i]  );

      for (j = 0; j < inputLength; j++) {
        if( input[j].locationId == activeLocations[i].id ){
          input[j].isDivider = false;
          output.push( input[j] );
        }
      }
    }
    return output;
  }
})

.filter('manageDividersFilter', function($parse) {
  return function(input) {
    if(!input || !input.length) return;

    //console.log('<GFF> GiveListCtrl: manageDividersFilter: input.length: ' + input.length);

    var output = [], i, inputLength = input.length;
    for(i = 0; i < inputLength; i++){
      if( input[i+1] ){
        if( !input[i].isDivider || input[i].isDivider && !input[i+1].isDivider ){
          //Divider is empty of content
          output.push(input[i]);
        }
      } else if ( !input[i+1] ){
        if( !input[i].isDivider ){
          //last item in the list is not a divider
          output.push(input[i]);
        }
      }
    }
    return output;
  };
})

//Set the correct html for a divider
.directive('dividerNgRepeat', function($parse) {
  return {
    scope: true,
    link:function(scope, iElement, iAttrs){
      if( scope.item.isDivider ){
        iElement.removeClass('item-thumbnail-left item-icon-right item-complex item-right-editable')
        .addClass('item-divider');
        iElement.empty();
        iElement.append(scope.item.name);
      }
    }
  };
})
//remove links from disabled items
.directive('disabledNoClickNgRepeat', function($parse) {
  return {
    scope: true,
    link: function postLink(scope, iElement, iAttrs){
      //console.log('<GFF> GiveListCtrl: disabledNoClickNgRepeat: iElement.scope().item.disabled : ' + iElement.scope().item.disabled );
      if( scope.item.disabled ){
        iElement.removeAttr('href');
        var img = iElement.find('img').detach();
        var h2 = iElement.find('h2').detach();
        var i = iElement.find('i').detach();
        iElement.find('a').remove();
        iElement.append('<div class="item-content"></div>');
        iElement.find('div').append(img).append(h2).append(i);
      }
    }
  };
});
