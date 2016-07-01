app.directive('uiShowPassword',
  function($parse) {
    return {
      restrict: 'A',
      scope: true,
      link: function (scope, iElement, iAttrs) {
        var showPasswordButton = angular.element('<button class="button button-clear button-stable"><i class="ion-eye"></i></button>'),
          elemType = iElement.attr('type');

        // this hack is needed because Ionic prevents browser click event
        // from elements inside label with input
        showPasswordButton.on('mousedown', function (event) {
          (iElement.attr('type') === elemType) ?
            iElement.attr('type', 'text') : iElement.attr('type', elemType);
          showPasswordButton.toggleClass('button-dark');
          //prevent input field focus
          event.stopPropagation();
        });

        showPasswordButton.on('touchend', function (event) {
          var syntheticClick = new Event('mousedown');
          event.currentTarget.dispatchEvent(syntheticClick);

          //stop to block ionic default event
          event.stopPropagation();
        });

        if (iElement.attr('type') === 'password') {
          iElement.after(showPasswordButton);
        }
      }
    }
});
