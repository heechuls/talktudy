angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.chats = Chats.all();
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
    /*var study_items = ["시제", "완료", "조동사", "To부정사", "동명사", "수동태", "전치사", "관계대명사",
    "접속사", "부사", "형용사", "가정법", "비교급", "수량", "비인칭 주어", "가족", "애완동물", "도둑/강도",
    "스포츠", "레저/취미", "패션", "로또", "여행", "맛집", "꿈", "미드", "친구", "북한", "결혼", "연애"];
    for(var i in study_items)
    {
      addStudyItem(study_items[i]);
    }*/
    
    //addStudyItem("전치사");    
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});