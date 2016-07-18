// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
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
    var push = new Ionic.Push({
      "debug": true
    });
    push.register(function(token) {
      console.log("Device token:",token.token);
      push.saveToken(token);  // persist the token in the Ionic Platform
      MyProfile.token = token;
    });
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $ionicConfigProvider.tabs.position('top'); // other values: top
  $stateProvider

    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('tab.activities', {
      url: '/activities',
      views: {
        'tab-activities': {
          templateUrl: 'templates/tab-activities.html',
          controller: 'ActivityCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.study', {
    url: '/study',
    views: {
      'tab-study': {
        templateUrl: 'templates/tab-study.html',
        controller: 'StudyCtrl'
      }
    }
  })
  .state('tab.sns', {
    url: '/sns',
    views: {
      'tab-sns': {
        templateUrl: 'templates/tab-sns.html',
        controller: 'SNSCtrl'
      }
    }
  })
  .state('mainguide', {
      url: '/mainguide',
      templateUrl: 'templates/guide/main_guide.html',
      controller: 'MainGuideCtrl'
  })

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
    .state('talkguide1', {
      url: '/talkguide1',
      templateUrl: 'templates/guide/talk_guide1.html',
      controller: 'TalkGuideCtrl1'
    })
    .state('talkguide2', {
      url: '/talkguide2',
      templateUrl: 'templates/guide/talk_guide2.html',
      controller: 'TalkGuideCtrl2'
    })
    .state('talkguide3', {
      url: '/talkguide3',
      templateUrl: 'templates/guide/talk_guide3.html',
      controller: 'TalkGuideCtrl3'
    })
    .state('talkguide4', {
      url: '/talkguide4',
      templateUrl: 'templates/guide/talk_guide4.html',
      controller: 'TalkGuideCtrl4'
    })
    .state('talkguide5', {
      url: '/talkguide5',
      templateUrl: 'templates/guide/talk_guide5.html',
      controller: 'TalkGuideCtrl5'
    })
    .state('talkmain', {
      url: '/talkmain',
      templateUrl: 'templates/guide/talk_main.html',
      controller: 'TalkMainCtrl'
    })
    .state('userprofile', {
      url: '/userprofile/:userid',
      templateUrl: 'templates/userprofile.html',
      controller: 'UserProfileCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
