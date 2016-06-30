angular.module('starter.controllers', [])

    .controller('ProfileCtrl', function ($scope, StudyItems, $ionicModal) {
        $scope.study_items = chunk(StudyItems.List , 5);
        $scope.myprofile = MyProfile;
        if(MyProfile.gender==1)
            document.getElementById("profile-image").src = "/img/female.png";

        $scope.select = function (study_item_num) {

        }
        $ionicModal.fromTemplateUrl('templates/modal/rate-study-item.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.rateChange = function (u) {
            DBHandler.rateChange($scope.myprofile.userid, )
            $scope.modal.hide();
            console.log($scope.modal.choice);

        };

        // Execute action on hide modal
        $scope.$on('modal.hidden', function () {
        });

        $scope.showModal = function(item){
            console.log(item);
            $scope.modal.choice = 'passed';
            $scope.modal.title = item;
            $scope.modal.show();
        }
    })

.controller('ActivityCtrl', function($scope, Activities) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.activities = Activities.all();
      /*var study_items = ["시제", "완료", "조동사", "To부정사", "동명사", "수동태", "전치사", "관계대명사",
      "접속사", "부사", "형용사", "가정법", "비교급", "수량", "비인칭 주어", "가족", "애완동물", "도둑/강도",
      "스포츠", "레저/취미", "패션", "로또", "여행", "맛집", "꿈", "미드", "친구", "북한", "결혼", "연애"];
      for(var i in study_items)
      {
        DBHandler.addStudyItem2(i, study_items[i]);
      }*/
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
      DBHandler.participateClass('01028225321', '2016-06-22', 0);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Activities) {
  $scope.chat = Activities.get($stateParams.chatId);
})

.controller('StudyCtrl', function($scope) {
    
})
.controller('SNSCtrl', function($scope, Users) {
    $scope.users = Users.all(); 
})
.controller('LoginCtrl', function($scope, LoginService, StudyItems, $ionicPopup, $state) {
    $scope.data = {};

    
    $scope.login = function() {

        LoginService.loginUser($scope.data.password).success(function(data) {
            $state.go('mainguide');
            init(StudyItems);
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
;
function init(StudyItems) {
    DBHandler.getUserInfo(function (){

    }, "shin");
    DBHandler.setStudyResultItems(MyProfile.userid);
    DBHandler.getStudyResult(function (retval) {
        StudyItems.List = retval.slice(0); //Copying Array
    }, MyProfile.userid);
}

function chunk(arr, size) {
    var newArr = [];
    for (var i = 0; i < arr.length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }
    return newArr;
}
