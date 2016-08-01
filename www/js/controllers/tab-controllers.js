angular.module('starter.controllers', ['ionic'/*, 'ionic.service.core', 'ionic.service.push'*/])

    .controller('ProfileCtrl', function ($scope, StudyItems, ShopItems, $ionicModal, $state, $ionicPopup) {
        $scope.study_items = chunk(StudyItems.List , 5);
        $scope.myprofile = GLOBALS.MyProfile;

        if(GLOBALS.MyProfile.gender==1)
            document.getElementById("profile-image").src = "img/female.png";

        $ionicModal.fromTemplateUrl('templates/modal/rate-study-item.html', {
            id: '1',
            scope: $scope,
            backdropClickToClose: false,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal1 = modal;
            $scope.oModal1.password = "";
        });

        $ionicModal.fromTemplateUrl('templates/modal/rate-level.html', {
            id: '2',
            scope: $scope,
            backdropClickToClose: false,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal2 = modal;
        });

        $scope.rateChange = function () {
            console.log($scope.oModal1.password);
            console.log(GLOBALS.Password[GLOBALS.PASSWORD_ADMIN].password);
            if ($scope.oModal1.password == GLOBALS.Password[GLOBALS.PASSWORD_ADMIN].password) {
                $scope.oModal1.hide();
                console.log($scope.oModal1.choice);
                DBHandler.setStudyResult($scope.myprofile.userid, $scope.oModal1.study_item_name, $scope.oModal1.choice, function () {
                    loadData();
                    DBHandler.updateUserStudyResultStat(GLOBALS.MyProfile.userid);
                });
            }
            else {
                var alertPopup = $ionicPopup.alert({
                    title: STRING.CHANGE_FAIL,
                    template: STRING.CONFIRM_PASSWORD
                });
            }
        };
        $scope.rateLevel = function (type, level) {
            if ($scope.oModal2.password == GLOBALS.Password[GLOBALS.PASSWORD_ADMIN].password) {
                $scope.oModal2.hide();
                DBHandler.rateLevel($scope.myprofile.userid, type, level, function () {
                    loadData();
                });
            }
            else {
                var alertPopup = $ionicPopup.alert({
                    title: STRING.CHANGE_FAIL,
                    template: STRING.CONFIRM_PASSWORD
                });
            }
        }
        
        $scope.showStudyResultModal= function(item){
            console.log(item);
            $scope.oModal1.choice = item.result;
            if(item.result != 0)
                $scope.oModal1.title = item.name + " (" + item.date + " reviewed)";
            else $scope.oModal1.title = item.name;
            $scope.oModal1.study_item_name = item.name;
            $scope.oModal1.password = "";
            $scope.oModal1.show();
        }

        $scope.showLevelModal= function(type, level){
            if(type == 0)
                $scope.oModal2.title = STRING.SPEAKING_LEVEL;
            if (type == 1)
                $scope.oModal2.title = STRING.PRONUNCIATION_LEVEL;

            $scope.oModal2.type = type;
            $scope.oModal2.level = level;
            $scope.oModal2.password = "";
            $scope.oModal2.show();
        }
        $scope.$on('$ionicView.loaded', function() {
            if(GLOBALS.MyProfile.isAdmin == undefined){
                document.getElementById('joiner-btn').style.display = "none";
                document.getElementById('pronunciation-btn').style.display = "none";
            }
        });
        $scope.$on('$destroy', function () {
            console.log('Destroying modals...');
            $scope.oModal1.remove();
            $scope.oModal2.remove();
        });
        
        function loadData() {
            init(StudyItems, null, function() {
                $scope.study_items = chunk(StudyItems.List, 5);
                $scope.$apply();
            });
        }
    })

.controller('ActivityCtrl', function($scope, $ionicModal, Activities, ShopItems, $ionicPopup, $ionicPlatform, $ionicNavBarDelegate/*, $cordovaBadge*/) {
  /*
    $ionicPlatform.registerBackButtonAction(function () {
    if (condition) {
        navigator.app.exitApp();
    } else {
        handle back action!
    }
    }, 100);*/
    $ionicNavBarDelegate.showBackButton(true);
  $scope.$on("onNotification", function(ev, args) {
    notificationHandlerForAll(ev, args, $ionicPopup, refreshList);
  });

  $scope.$on('$ionicView.loaded', function(){

        refreshList();
    });
    function setBadge(val){
        $cordovaBadge.hasPermission().then(function(result) {
                $cordovaBadge.set(val);
            }, function(error) {
                alert(error);
            });
    }
  $ionicModal.fromTemplateUrl('templates/modal/purchase-item.html', {
        id: '1',
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-up'
  }).then(function (modal) {
      $scope.purchase_modal = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modal/participate-phone-talk.html', {
        id: '2',
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.phonetalk_modal = modal;
    });

  $scope.purchase = function () {
      $scope.shop_items = ShopItems.List;
      $scope.purchase_modal.show();
  }
  
  $scope.show_phonetalk_modal = function () {
      function falseShow(){
          $scope.phonetalk_modal.time = 1;
          $scope.phonetalk_modal.duration = 1;         
          $scope.phonetalk_modal.isPhoneTalkParcitipated = false; 
          $scope.phonetalk_modal.show();
      }
      if($scope.phonetalk_modal.phonetalk_info == undefined){
          DBHandler.getPhoneTalkInfoToday(GLOBALS.MyProfile.userid, function(retVal){
              if(retVal != undefined){
                $scope.phonetalk_modal.phonetalk_info = retVal;
                $scope.phonetalk_modal.time = retVal.time;
                $scope.phonetalk_modal.duration = retVal.duration;         
                $scope.phonetalk_modal.isPhoneTalkParcitipated = true; 
                $scope.phonetalk_modal.show();
              }
              else falseShow();
          });
      }
      else{
      }

  }

  $scope.purchase_item = function(item) {
      DBHandler.buyItem(GLOBALS.MyProfile.userid, new Date().yyyymmdd(), item.name, 1, function(){
          //$scope.showToast($cordovaToast, "구매가 완료되었습니다.", "short", "center");
          DBHandler.addClassPurchaseCost($scope.myprofile.userid, new Date().yyyymmdd(), item.price, function(){
                $scope.$apply();
          });
          DBHandler.addTotalPurchaseCost($scope.myprofile.userid, item.price, function(){
              DBHandler.getUserInfo($scope.myprofile.userid, function () {
                refreshList();
                $scope.myprofile = GLOBALS.MyProfile;
            });
          });
          $scope.modal.hide();
      });
  }
  $scope.showToast = showToast;
  $scope.participateInClass = function(){
    if(GLOBALS.MyProfile.remained_class == 0 && !$scope.activities[0].class_participation){
        showClassExpirePopup($ionicPopup)
        return;
    }
    var done = function(){
          document.getElementById('class').innerHTML="<b style='text-decoration: underline' type='submit' ng-click='participate()'>" + text + "</b><br>";
          DBHandler.getUserInfo($scope.myprofile.userid, function () {
            $scope.myprofile = GLOBALS.MyProfile;
            $scope.$apply();
          });          
      }
      if(!$scope.activities[0].class_participation){
        text = STRING.STUDY_TO_PARTICIPATE;
        DBHandler.participateInClassToday($scope.myprofile.userid, true, done);
        $scope.activities[0].class_participation = !$scope.activities[0].class_participation;
      }
      else{ 
        if(DBHandler.isChangableTime()){
            text = STRING.STUDY_NOT_TO_PARTICIPATE;
            DBHandler.participateInClassToday($scope.myprofile.userid, false, done);
            $scope.activities[0].class_participation = !$scope.activities[0].class_participation;
        }
        else{
            var alertPopup = $ionicPopup.alert({
                title: STRING.STATUS_NOT_CHANGEBLE,
                template: STRING.STUDY_IN_PROGRESS
            });
        }
      }
  }

  $scope.participateInPhoneTalk = function(){
      var done = function(){
          document.getElementById('phone').innerHTML="<b style='text-decoration: underline' type='submit' ng-click='participate()'>" + text + "</b><br>";
            DBHandler.getPhoneTalkInfoToday(GLOBALS.MyProfile.userid, function(retVal){
              $scope.phonetalk_modal.phonetalk_info = retVal;
              $scope.phonetalk_modal.hide();
          });
      }
      if($scope.phonetalk_modal.isPhoneTalkParcitipated){
        text = STRING.PHONETALK_TO_PARTICIPATE;
        DBHandler.participateInPhoneTalkToday($scope.myprofile.userid, true, $scope.phonetalk_modal.time, $scope.phonetalk_modal.duration, done);
      }
      else{ 
        text = STRING.PHONETALK_NOT_TO_PARTICIPATE;
        DBHandler.participateInPhoneTalkToday($scope.myprofile.userid, false, $scope.phonetalk_modal.time, $scope.phonetalk_modal.duration, done);
      }
      $scope.activities[0].phonetalk_participation = !$scope.activities[0].phonetalk_participation;
  }
  
  function refreshList(){
        DBHandler.getActivityList(GLOBALS.MyProfile.userid, function(retval){
            $scope.activities = retval.slice(0);
            console.log($scope.activities);
            $scope.myprofile = GLOBALS.MyProfile;
            $scope.$apply();
            initList();
        }, function(retval2){   
            $scope.activities = retval2.slice(0);
            $scope.$apply();      
        });
  }
  function initList(){
        var class_text = STRING.STUDY_PARTICIPATION;
        var phone_text = STRING.PHONETALK_PARTICIPATION;
        console.log($scope.activities[0]);

        var class_participation = $scope.activities[0].class_participation;
        var phonetalk_participation = $scope.activities[0].phonetalk_participation;
        
        if(class_participation === 0 && class_participation !== undefined)
            class_text = STRING.STUDY_NOT_TO_PARTICIPATE;
        
        else if(class_participation === 1 && class_participation !== undefined)
            class_text = STRING.STUDY_TO_PARTICIPATE;

        if(phonetalk_participation == 0 && phonetalk_participation !== undefined)
            phone_text = STRING.PHONETALK_NOT_TO_PARTICIPATE;
        
        else if(phonetalk_participation == 1 && phonetalk_participation !== undefined)
            phone_text = STRING.PHONETALK_TO_PARTICIPATE;

        document.getElementById('class').innerHTML="<b style='text-decoration:underline'>" + class_text +"</b><br>";
        document.getElementById('phone').innerHTML="<b style='text-decoration:underline'>" + phone_text +"</b><br>";
        document.getElementById('isClassParticipated').style.display = "none";
        document.getElementById('isPhonetalkParticipated').style.display = "none";
    }
})
.controller('StudyCtrl', function($scope, $state) {
/*    $scope.grammar = function(){
        $state.go('tab.talkmain');
    };
    $scope.topic = function(){
        $state.go('talkguide1');
    };*/
    
    $scope.$on('$ionicView.loaded', function() {
    if(GLOBALS.MyProfile.isAdmin == undefined){
        document.getElementById('admin-bar').style.display = "none";
    }
    });
})
.controller('UploadCtrl', ['$scope', 'fileUpload', 'Users', function($scope, fileUpload, Users){
    $scope.$on('$ionicView.enter', function(){
        Users.retrieveAllUserList(function(){
            $scope.users = Users.all(); 
            $scope.$apply();
        });
    });
    $scope.upload = function(userid){
        var file = $scope.myFile;
        console.log('file is ');
        console.dir(file);
        var uploadUrl = "http://lunar-pic.com/";
        fileUpload.uploadFileToUrl(userid, file, uploadUrl);
    }
}])
.controller('SNSCtrl2', function($scope, Users) {

  $scope.demo = 'all';
  $scope.setPlatform = function(p) {
    document.body.classList.remove('platform-similar');
    document.body.classList.remove('platform-all');
    document.body.classList.add('platform-' + p);
    $scope.demo = p;
  }
    $scope.$on('$ionicView.enter', function(){
        Users.retrieveAllUserList(function(){
            $scope.users = Users.all(); 
            $scope.$apply();
        });
    });  
})

.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]); 