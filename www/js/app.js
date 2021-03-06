// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova', 'ionic.service.core', 'starter.controllers', 'starter.services'/* , 'ngCordova'*/])

  .run(function ($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function () {
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
        "debug": false,
        "onNotification": function (notification) {
          var payload = notification.payload;
          console.log("Push Received : " + notification.toString());
          console.log(notification);
          if (ionic.Platform.isIOS()) {
            var args = {
              code: notification["_raw"]["additionalData"]["code"],
              message: notification["_raw"]["message"],
              body: notification["_raw"]["additionalData"]["body"]
            };
            $rootScope.$broadcast("onNotification", args);
            markNotification(args);
          }
          else {
            var args = {
              code: notification["_raw"]["additionalData"]["code"],
              message: notification["_raw"]["message"],
              body: notification["_raw"]["title"]
            };
            $rootScope.$broadcast("onNotification", args);
            markNotification(args);
          }
        },
        "onRegister": function (data) {
          console.log(data.token);
        },
        "pluginConfig": {
          ios: {
            alert: true,
            badge: true,
            sound: true
          },
          android: {
            sound: true,
            vibrate: true,
            forceShow: true,
            iconColor: "#601dc2"
          },
        }
      });
      console.log("Push Register");
      push.register(function (token) {
        console.log("Device token:", token.token);
        push.saveToken(token);  // persist the token in the Ionic Platform
        GLOBALS.MyProfile.token = token;
      });
      function markNotification(args) {
        if (GLOBALS.MyProfile.isLoggedIn == false) {
          /*          if(code == "STUDY_PARTICIPATION")
                      GLOBALS.isStudyConfirmReceived = true;
                    else if(code == "PHONETALK_PARTICIPATION")
                      GLOBALS.isPhoneTalkConfirmReceived = true; */
          //alert("First");
          console.log("Notification Added");
          GLOBALS.ReceivedNotifications.push(args);
        }
      }
      //if none of the above states are matched, use this as the fallback
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $cordovaInAppBrowserProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    //$ionicConfigProvider.tabs.position('top'); // other values: top
    $ionicConfigProvider.platform.android.tabs.position("bottom");
    $stateProvider

      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.profile', {
        url: '/profile',
        views: {
          'tab-profile': {
            templateUrl: 'templates/tabs/tab-profile.html',
            controller: 'ProfileCtrl'
          }
        }
      })
      .state('tab.audiolist', {
        url: '/audiolist',
        views: {
          'tab-profile': {
            templateUrl: 'templates/general/audiolist.html',
            controller: 'AudioListCtrl'
          }
        }
      })
      .state('tab.activities', {
        url: '/activities',
        views: {
          'tab-activities': {
            templateUrl: 'templates/tabs/tab-activities.html',
            controller: 'ActivityCtrl'
          }
        }
      })
      .state('tab.study', {
        url: '/study',
        views: {
          'tab-study': {
            templateUrl: 'templates/tabs/tab-study.html',
            controller: 'StudyCtrl'
          }
        }
      })
      .state('tab.joiner', {
        url: '/joiner',
        views: {
          'tab-study': {
            templateUrl: 'templates/general/admin-joiner.html',
            controller: 'JoinerListCtrl'
          }
        }
      })
      .state('tab.upload', {
        url: '/upload',
        views: {
          'tab-study': {
            templateUrl: 'templates/general/upload.html',
            controller: 'UploadCtrl'
          }
        }
      })
      .state('tab.userlist', {
        url: '/userlist',
        views: {
          'tab-study': {
            templateUrl: 'templates/general/userlist.html',
            controller: 'UserListCtrl'
          }
        }
      })
      .state('tab.sns', {
        url: '/sns',
        views: {
          'tab-sns': {
            templateUrl: 'templates/tabs/tab-sns.html',
            controller: 'SNSCtrl'
          }
        }
      })
      .state('tab.userprofile', {
        url: '/userprofile/:userid',
        views: {
          'tab-sns': {
            templateUrl: 'templates/general/userprofile.html',
            controller: 'UserProfileCtrl'
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
        templateUrl: 'templates/general/login.html',
        controller: 'LoginCtrl'
      })
      .state('versioncheck', {
        url: '/versioncheck',
        templateUrl: 'templates/general/versioncheck.html',
        controller: 'VersionCheckCtrl'
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
      .state('tab.talkmain', {
        url: '/talkmain/:type',
        views: {
          'tab-study': {
            templateUrl: 'templates/guide/talk_main.html',
            controller: 'TalkMainCtrl'
          }
        }
      });
    $urlRouterProvider.otherwise('/versioncheck');
  });