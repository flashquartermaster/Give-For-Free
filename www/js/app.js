// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngStorage', 'ngCordova', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $rootScope, Settings, AdUtil, ConnectivityMonitor) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    ConnectivityMonitor.startWatching();

    Settings.setDefaultSettings();
  });
})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

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
