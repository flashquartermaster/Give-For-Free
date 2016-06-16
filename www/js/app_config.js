app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.backButton.text('Back').icon('ion-chevron-left');
  $ionicConfigProvider.navBar.alignTitle("center");
  $ionicConfigProvider.tabs.position("bottom");

  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabCtrl'
  })

  // Each tab has its own nav history stack:
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.give', {
    url: '/give',
    views: {
      'tab-give': {
        templateUrl: 'templates/tab-give.html',
        controller: 'GiveCtrl'
      }
    }
  })

  .state('tab.give-detail', {
    url: '/give/:charityId',
    views: {
      'tab-give': {
        templateUrl: 'templates/give-detail.html',
        controller: 'GiveDetailCtrl'
      }
    }
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
