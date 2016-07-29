angular.module('starter.controllers', ['ionic'/*, 'ionic.service.core', 'ionic.service.push'*/])

    .controller('ProfileCtrl', function ($scope, StudyItems, ShopItems, $ionicModal, $state, $ionicPopup) {
        $scope.study_items = chunk(StudyItems.List , 5);
        $scope.myprofile = MyProfile;

        if(MyProfile.gender==1)
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
            console.log(Password[1].password);
            if ($scope.oModal1.password == Password[1].password) {
                $scope.oModal1.hide();
                console.log($scope.oModal1.choice);
                DBHandler.setStudyResult($scope.myprofile.userid, $scope.oModal1.study_item_name, $scope.oModal1.choice, function () {
                    loadData();
                    DBHandler.updateUserStudyResultStat(MyProfile.userid);
                });
            }
            else {
                var alertPopup = $ionicPopup.alert({
                    title: '변경 실패',
                    template: '비밀번호를 확인해 주세요'
                });
            }
        };
        $scope.rateLevel = function (type, level) {
            if ($scope.oModal2.password == Password[1].password) {
                $scope.oModal2.hide();
                DBHandler.rateLevel($scope.myprofile.userid, type, level, function () {
                    loadData();
                });
            }
            else {
                var alertPopup = $ionicPopup.alert({
                    title: '변경 실패',
                    template: '비밀번호를 확인해 주세요'
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
                $scope.oModal2.title = "Speaking Level"
            if (type == 1)
                $scope.oModal2.title = "Pronunciation Level"

            $scope.oModal2.type = type;
            $scope.oModal2.level = level;
            $scope.oModal2.password = "";
            $scope.oModal2.show();
        }
        $scope.$on('$ionicView.loaded', function() {
            if(MyProfile.isAdmin == undefined){
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
/*    var study_items = ["시제", "완료", "조동사", "To부정사", "동명사", "수동태", "전치사", "관계대명사",
      "접속사", "부사", "형용사", "가정법", "비교급", "수량", "비인칭 주어", "가족", "애완동물", "도둑/강도",
      "스포츠", "레저/취미", "패션", "로또", "여행", "맛집", "꿈", "미드", "친구", "북한", "결혼", "연애"];
      for(var i in study_items)
      {
        DBHandler.addStudyItem2(i, study_items[i]);
      }
      DBHandler.setStudyResultItems("01028225321");
      DBHandler.setStudyResultItems("01012121212");
      DBHandler.setStudyResultItems("01099223157");
      
*/


  $scope.remove = function(chat) {
      //Chats.remove(chat);
      //var refUser = firebase.database().ref('/user/');
      //refUser.push('shin');
      //document.write('<script type="text/javascript" src="js/usermgr.js"></script>');
      //addUser('shin', '신희철', 'heechul78@gmail.com', '010-2822-5321');
      //addUser('shin', '신희철', '010-2822-5321', 0, 'heechul78@gmail.com', 4, 4)
      //addClass("2016-06-25");
      //addClassEnroll('shin', 4);
      //isPasswordMatched(1, "12345");
      //addShopItem("맥주", 5000);
      //getPriceOfShopItem("소주");
      
      //addStudyItem("전치사");    
      //rateStudyItem("shin", "조동사", 0);
      //participateActivity('2016-06-21', '01022212312', true);
      //participateActivity('2016-06-21', '01028225321', false);
      //buyItem('2016-06-21', '01022212312', '맥주', 1);
      //buyItem('2016-06-21', '01022212312', '소주', 2);
      //buyItem('2016-06-21', '01022212312', '과자', 3);
      //buyItem('2016-06-21', '01028225321', '땅콩', 1);
      //buyItem('01028225321', '2016-06-21', '킷캣', 2);
      /*buyItem('01028225321', '2016-06-21', '음료수', 4);
      participateClass('01028225321', '2016-06-21', 1);
      participatePhoneTalk('01028225321', '2016-06-21', 0);
      participatePhoneTalk('01028225321', '2016-06-22', 0);
      participateClass('01028225321', '2016-06-22', 1);*/
      //DBHandler.participateClass('01028225321', '2016-06-22', 0);
  };
  $ionicModal.fromTemplateUrl('templates/modal/purchase-item.html', {
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-up'
  }).then(function (modal) {
      $scope.modal = modal;
  });
  $scope.purchase = function () {
      $scope.shop_items = ShopItems.List;
      $scope.modal.show();
  }
  $scope.purchase_item = function(item) {
      DBHandler.buyItem(MyProfile.userid, new Date().yyyymmdd(), item.name, 1, function(){
          //$scope.showToast($cordovaToast, "구매가 완료되었습니다.", "short", "center");
          DBHandler.addClassPurchaseCost($scope.myprofile.userid, new Date().yyyymmdd(), item.price, function(){
                $scope.$apply();
          });
          DBHandler.addTotalPurchaseCost($scope.myprofile.userid, item.price, function(){
              DBHandler.getUserInfo($scope.myprofile.userid, function () {
                refreshList();
                $scope.myprofile = MyProfile;
            });
          });
          $scope.modal.hide();
      });
  }
  $scope.showToast = showToast;
  $scope.participateInClass = function(){
    if(MyProfile.remained_class == 0 && !$scope.activities[0].class_participation){
        showClassExpirePopup($ionicPopup)
        return;
    }
    var done = function(){
          document.getElementById('class').innerHTML="<b style='text-decoration: underline' type='submit' ng-click='participate()'>" + text + "</b><br>";
          DBHandler.getUserInfo($scope.myprofile.userid, function () {
            $scope.myprofile = MyProfile;
            $scope.$apply();
          });          
      }
      if(!$scope.activities[0].class_participation){
        text = "스터디 참석예정";
        DBHandler.participateInClassToday($scope.myprofile.userid, true, done);
        $scope.activities[0].class_participation = !$scope.activities[0].class_participation;
      }
      else{ 
        if(DBHandler.isChangableTime()){
            text = "스터디 불참예정";
            DBHandler.participateInClassToday($scope.myprofile.userid, false, done);
            $scope.activities[0].class_participation = !$scope.activities[0].class_participation;
        }
        else{
            var alertPopup = $ionicPopup.alert({
                title: '변경 불가',
                template: '스터디가 이미 진행되어 변경이 불가합니다.'
            });
        }
      }
  }

  $scope.participateInPhoneTalk = function(){
      var done = function(){
          document.getElementById('phone').innerHTML="<b style='text-decoration: underline' type='submit' ng-click='participate()'>" + text + "</b><br>";
      }
      if($scope.activities[0].phonetalk_participation){
        text = "전화영어 참석예정";
        DBHandler.participateInPhoneTalkToday($scope.myprofile.userid, true, done);
      }
      else{ 
        text = "전화영어 불참예정";
        DBHandler.participateInPhoneTalkToday($scope.myprofile.userid, false, done);
      }
      $scope.activities[0].phonetalk_participation = !$scope.activities[0].phonetalk_participation;
  }
  function refreshList(){
        DBHandler.getActivityList(MyProfile.userid, function(retval){
            $scope.activities = retval.slice(0).reverse();
            console.log($scope.activities);
            $scope.myprofile = MyProfile;
            $scope.$apply();
            initList();
        }, function(retval2){   
            $scope.activities = retval2.slice(0).reverse();
            $scope.$apply();      
        });
  }
  function initList(){
        var class_text = "스터디 참여";
        var phone_text = "전화영어 참여";
        console.log($scope.activities[0]);

        var class_participation = $scope.activities[0].class_participation;
        var phonetalk_participation = $scope.activities[0].phonetalk_participation;
        
        if(class_participation === 0 && class_participation !== undefined)
            class_text = "스터디 불참예정";
        
        else if(class_participation === 1 && class_participation !== undefined)
            class_text = "스터디 참석예정";

        if(phonetalk_participation == 0 && phonetalk_participation !== undefined)
            phone_text = "전화영어 불참예정";
        
        else if(phonetalk_participation == 1 && phonetalk_participation !== undefined)
            phone_text = "전화영어 참석예정";

        document.getElementById('class').innerHTML="<b style='text-decoration:underline'>" + class_text +"</b><br>";
        document.getElementById('phone').innerHTML="<b style='text-decoration:underline'>" + phone_text +"</b><br>";
        document.getElementById('isClassParticipated').style.display = "none";
        document.getElementById('isPhonetalkParticipated').style.display = "none";
    }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Activities) {
  $scope.chat = Activities.get($stateParams.chatId);
})

.controller('StudyCtrl', function($scope, $state) {
/*    $scope.grammar = function(){
        $state.go('tab.talkmain');
    };
    $scope.topic = function(){
        $state.go('talkguide1');
    };*/
    
    $scope.$on('$ionicView.loaded', function() {
    if(MyProfile.isAdmin == undefined){
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
            if(retVal == USER_VALID || retVal == USER_ADMIN){
                if(retVal == USER_ADMIN)
                    MyProfile.isAdmin = true;
    
                LoginService.loginUser($scope.data.password).success(function(data) {
                    $state.go('mainguide');
                    MyProfile.userid = $scope.data.phonenumber;
                    init(StudyItems, ShopItems, function(){
                        if(MyProfile.remained_class == 0){
                            showClassExpirePopup($ionicPopup);
                        }           
                    });
                }).error(function(data) {
                    var alertPopup = $ionicPopup.alert({
                        title: '로그인에 실패',
                        template: '비밀번호를 확인해 주세요'
                    });
                });
                console.log(" - PW: " + $scope.data.password);
            }
            else if(retVal == USER_INVALID){
                    var alertPopup = $ionicPopup.alert({
                        title: '로그인에 실패',
                        template: '만료된 계정입니다.'
                    });
            }        
            else if(retVal == USER_NONE){
                    var alertPopup = $ionicPopup.alert({
                        title: '로그인에 실패',
                        template: '등록된 계정이 없습니다.'
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
        MyProfile.token = token;
      });
    }
})
.controller('VersionCheckCtrl', function($scope, $state, $window, Version) {
    $scope.text = "버전 확인중";
    $scope.style = "none";

    $scope.goupdate = function(){
        $window.open("//lunar-pic.com:5000");
    }
    $scope.$on('$ionicView.beforeEnter', function(){
        Version.isVersionMatched(function(retval){
            if(retval == true)
                $state.go("login");
            else{
                $scope.style = "show";
                $scope.text = "현재 버전은 구 버전입니다.새 버전을 다운 받아 사용해주세요.";
        
            }
        });
    });

})

.controller('MainGuideCtrl', function($scope, $state) {
  $scope.ok = function() {
        $state.go('tab.activities');
  }
  })
.controller('TalkGuideCtrl', function($scope) {
    $scope.guide_no = 0;
    $scope.guide = function(page)
    {
        var page_headed = 'guide' + page;
        $state.go(page_headed)
    }
  })
.controller('TalkGuideCtrl1', function($scope, $state) {
    $scope.next = function(){
        $state.go('talkguide2');
    }
})
.controller('TalkGuideCtrl2', function($scope, $state) {
    $scope.next = function(){
        $state.go('talkguide3');
    }
})
.controller('TalkGuideCtrl3', function($scope, $state) {
    $scope.next = function(){
        $state.go('talkguide4');
    }
})
.controller('TalkGuideCtrl4', function($scope, $state) {
    $scope.next = function(){
        $state.go('talkguide5');
    }
})
.controller('TalkGuideCtrl5', function($scope, $state) {
    $scope.next = function(){
        $state.go('talkmain');
    }
})
.controller('TalkMainCtrl', function($scope, $state, $sce, $ionicPlatform, $stateParams) {
 /*   document.addEventListener('deviceready', function () {
    document.addEventListener("backbutton", function(){
        var iframe = document.getElementById('contents');
        iframe.contentWindow.history.go(-1);
    }, false);
    },false);*/
$ionicPlatform.registerBackButtonAction(function (event) {
    if($state.current.name=="app.home"){
      navigator.app.exitApp();
    }
    else {
      navigator.app.backHistory();
    }
  }, 100);
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

    $scope.$on('$ionicView.beforeEnter', function(){
        $scope.title = "문법";
        if($stateParams.type == 1)
            $scope.address = "http://talktudy.herokuapp.com/grammar";
        else if($stateParams.type == 2)
            $scope.address = "http://talktudy.herokuapp.com/category";
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

function init(StudyItems, ShopItems, done) {
    //DBHandler.createTodayClass("shin");
    /*DBHandler.addShopItem2('맥주', 5000, "병");
    DBHandler.addShopItem2('소주', 3000, "병");
    DBHandler.addShopItem2('새우깡', 1500, "봉지");
    DBHandler.addShopItem2('오징어칩', 1000, "봉지");
    */

    DBHandler.getUserInfo(MyProfile.userid, function (){
        //Need to perform in Admin side when a user is registered
        //DBHandler.setStudyResultItems(MyProfile.userid);
        DBHandler.saveDeviceToken(MyProfile.userid, MyProfile.token, 
            ionic.Platform.isIOS() == true || ionic.Platform.isIPad() == true ? 0 : 1 );
        DBHandler.getStudyResult(MyProfile.userid, function (retval) {
            StudyItems.List = retval.slice(0); //Copying Array
            if (done != null)
                done();
        });
        DBHandler.getPasswordList();
        if (ShopItems != null) {
            DBHandler.getShopItems(function (retval) {
                ShopItems.List = retval.slice(0);
            });
        }

    document.addEventListener("deviceready", onDeviceReady, false);
        
    }); 
}

function onDeviceReady() {
    window.plugins.sim.getSimInfo(successCallback, errorCallback);
}

function successCallback(result) {
    console.log("Sim Object : " + result["mcc"]);
}

function errorCallback(error) {
    console.log(error);
}

function chunk(arr, size) {
    var newArr = [];
    for (var i = 0; i < arr.length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }
    return newArr;
}

function showClassExpirePopup($ionicPopup){
    var template = class_expired;
    var alertPopup = $ionicPopup.alert({
        title: '스터디 소진',
        template: template
    });
}
function notificationHandlerForNotice(ev, args, $ionicPopup){
    console.log("onNotification received");
    if(args["code"] == "NOTICE"){
        $ionicPopup.alert({
                title: args["message"],
                template: args["body"]
            });
    }
}
function notificationHandlerForAll(ev, args, $ionicPopup, refreshList){
    notificationHandlerForNotice(ev, args, $ionicPopup);
    if(args["code"] == "STUDY_PARTICIPATION"){
    var confirmPopup = $ionicPopup.confirm({
                title: args["message"],
                template: args["body"]
        });
        confirmPopup.then(function(res) {
            if(res) {
                DBHandler.participateInClassToday(MyProfile.userid, true, function(){
                    console.log("Participated")
                    refreshList();
                });    
            } else {
                DBHandler.participateInClassToday(MyProfile.userid, false, function(){
                    console.log("Unparticipated")
                    refreshList();
                });
            }
        });    
    }
}