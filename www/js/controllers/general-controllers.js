angular.module('starter.controllers')
.controller('LoginCtrl', function($scope, LoginService, StudyItems, ShopItems, $ionicPopup, $state, $sce, $ionicPlatform, $ionicNavBarDelegate/*, $ionicPush, $ionicPlatform*/) {
    /*$ionicPlatform.registerBackButtonAction(function () {
    if (condition) {
        navigator.app.exitApp();
    } else {
        handle back action!
    }
    }, 100);*/
    $ionicNavBarDelegate.showBackButton(false);
    $scope.$on("onNotification", function (args) {
        notificationHandlerForNotice();
    });
    $scope.data = {};
    //pushSetup();
    $scope.login = function() {
        DBHandler.isUserValid($scope.data.phonenumber, function(retVal){
            if(retVal == GLOBALS.USER_VALID || retVal == GLOBALS.USER_ADMIN){
                if(retVal == GLOBALS.USER_ADMIN)
                    GLOBALS.MyProfile.isAdmin = true;
    
                LoginService.loginUser($scope.data.password).success(function(data) {
                    $state.go('mainguide');
                    GLOBALS.MyProfile.userid = $scope.data.phonenumber;
                    GLOBALS.MyProfile.isLoggedIn = true;
                    init(StudyItems, ShopItems, function(){
                        if(GLOBALS.MyProfile.remained_class == 0){
                            showClassExpirePopup($ionicPopup);
                        }           
                    });
                }).error(function(data) {
                    var alertPopup = $ionicPopup.alert({
                        title: STRING.LOGIN_FAIL,
                        template: STRING.CONFIRM_PASSWORD
                    });
                });
                console.log(" - PW: " + $scope.data.password);
            }
            else if(retVal == GLOBALS.USER_INVALID){
                    var alertPopup = $ionicPopup.alert({
                        title: STRING.LOGIN_FAIL,
                        template: STRING.EXPIRED_ACCOUNT
                    });
            }        
            else if(retVal == GLOBALS.USER_NONE){
                    var alertPopup = $ionicPopup.alert({
                        title: STRING.LOGIN_FAIL,
                        template: STRING.NO_ACCOUNT
                    });
            }
        });
    }

    function pushSetup(){
        var push = new Ionic.Push({
        "debug": false,
        "onNotification": function (notification) {
          var payload = notification.payload;
          console.log(notification, payload);
        },
        "onRegister": function (data) {
          console.log(data.token);
        },
        "pluginConfig": {
          "ios": {
            "badge": true,
            "sound": true
          },
          "android": {
            "iconColor": "#343434"
          }
        }
      });
      console.log("Push Register");
      push.register(function (token) {
        console.log("Device token:", token.token);
        push.saveToken(token);  // persist the token in the Ionic Platform
        GLOBALS.MyProfile.token = token;
      });
    }
})
.controller('VersionCheckCtrl', function($scope, $state, $window, Version) {
    $scope.text = STRING.VERSION_CHECKING;
    $scope.style = "none";

    $scope.goupdate = function(){
        $window.open(GLOBALS.PAGE_UPDATE);
    }
    $scope.$on('$ionicView.beforeEnter', function(){
        Version.isVersionMatched(function(retval){
            if(retval == true)
                $state.go("login");
            else{
                $scope.style = "show";
                $scope.text = STRING.OLD_VERSION;
        
            }
        });
    });

})
.controller('UserProfileCtrl', function($scope, $state, $stateParams, Users) {
      $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
    });
      $scope.$on('$ionicView.loaded', function(){
            Users.get($stateParams.userid, function(profile){
                $scope.profile = profile;
                DBHandler.getStudyResult($stateParams.userid, function (study_result) {
                    if($scope.profile.gender == 1)
                        document.getElementById("profile-image").src = "img/female.png";
                    $scope.study_items = chunk(study_result.slice(0), 5); //Copying Array
                    $scope.$apply();
                });
            });
      });
})
.controller('JoinerListCtrl', function($scope, $state) {
    $scope.$on('$ionicView.enter', function(){
        DBHandler.getClassParticipants(new Date().yyyymmdd(), function(retval){
            $scope.users = retval.slice(0);
            $scope.date = new Date().toDateString();
            $scope.$apply();
        });
    });

})