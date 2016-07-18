angular.module('starter.controllers', [])

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
            $scope.oModal1.show();
        }

        $scope.showLevelModal= function(type, level){
            if(type == 0)
                $scope.oModal2.title = "Speaking Level"
            if (type == 1)
                $scope.oModal2.title = "Pronunciation Level"

            $scope.oModal2.type = type;
            $scope.oModal2.level = level;
            $scope.oModal2.show();
        }

        $scope.$on('modal.shown', function (event, modal) {
            console.log('Modal ' + modal.id + ' is shown!');
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

.controller('ActivityCtrl', function($scope, $ionicModal, Activities, ShopItems) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.loaded', function(){
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
      });

      /*var study_items = ["시제", "완료", "조동사", "To부정사", "동명사", "수동태", "전치사", "관계대명사",
      "접속사", "부사", "형용사", "가정법", "비교급", "수량", "비인칭 주어", "가족", "애완동물", "도둑/강도",
      "스포츠", "레저/취미", "패션", "로또", "여행", "맛집", "꿈", "미드", "친구", "북한", "결혼", "연애"];
      for(var i in study_items)
      {
        DBHandler.addStudyItem2(i, study_items[i]);
      }
      DBHandler.setStudyResultItems("01028225321");
      DBHandler.setStudyResultItems("01012121212");
      DBHandler.setStudyResultItems("01099223157");
      

      DBHandler.addShopItem2('맥주', 5000, "병");
      DBHandler.addShopItem2('소주', 3000, "병");
      DBHandler.addShopItem2('새우깡', 1500, "봉지");
      DBHandler.addShopItem2('오징어칩', 1000, "봉지");
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
                  DBHandler.getActivityList($scope.myprofile.userid, function (retval) {
                      $scope.activities = retval.slice(0).reverse();
                      $scope.$apply();
                      initList();
                  }, function(retval2){
                      $scope.activities = retval2.slice(0).reverse();                    
                    $scope.$apply();      
                    });
                  $scope.myprofile = MyProfile;
            });
          });
          $scope.modal.hide();
      });
  }
  $scope.showToast = showToast;
  $scope.participateInClass = function(){
      var done = function(){
          document.getElementById('class').innerHTML="<b style='text-decoration: underline' type='submit' ng-click='participate()'>" + text + "</b><br>";
          DBHandler.getUserInfo($scope.myprofile.userid, function () {
            $scope.myprofile = MyProfile;
            $scope.$apply();
          });          
      }
      if($scope.activities[0].class_participation){
        text = "스터디 참석예정";
        DBHandler.participateInClassToday($scope.myprofile.userid, true, done);
      }
      else{ 
        text = "스터디 불참예정";
        DBHandler.participateInClassToday($scope.myprofile.userid, false, done);
      }
      $scope.activities[0].class_participation = !$scope.activities[0].class_participation;
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
    $scope.grammar = function(){
        $state.go('talkguide1');
    };
    $scope.topic = function(){
        $state.go('talkguide1');
    };
})
.controller('SNSCtrl', function($scope, Users) {
    $scope.$on('$ionicView.enter', function(){
        Users.retrieveAllUserList(function(){
            $scope.users = Users.all(); 
            $scope.$apply();
        });
    });
})
.controller('LoginCtrl', function($scope, LoginService, StudyItems, ShopItems, $ionicPopup, $state) {
    $scope.data = {};
    $scope.login = function() {
        MyProfile.userid = $scope.data.phonenumber;
        LoginService.loginUser($scope.data.password).success(function(data) {
            $state.go('mainguide');
            init(StudyItems, ShopItems);
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: '로그인에 실패',
                template: '비밀번호를 확인해 주세요'
            });
        });
        console.log(" - PW: " + $scope.data.password);
    }
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
.controller('TalkMainCtrl', function($scope, $state) {
    $scope.next = function(){
        $state.go('tab.study');
    }
})
.controller('UserProfileCtrl', function($scope, $state, $stateParams, Users) {
      $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
    });
      $scope.$on('$ionicView.loaded', function(){
            Users.get($stateParams.userid, function(profile){
                $scope.profile = profile;
                DBHandler.getStudyResult($stateParams.userid, function (study_result) {
                    $scope.study_items = chunk(study_result.slice(0), 5); //Copying Array
                    $scope.$apply();
                });
            });
      });
});  
function init(StudyItems, ShopItems, done) {
    //DBHandler.createTodayClass("shin");
    DBHandler.getUserInfo(MyProfile.userid, function () {
        //Need to perform in Admin side when a user is registered
        //DBHandler.setStudyResultItems(MyProfile.userid);
        DBHandler.saveDeviceToken(MyProfile.userid, MyProfile.token);
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