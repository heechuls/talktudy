angular.module('starter.controllers')
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
        if($stateParams.type == EN_GRAMMAR)
            $scope.address = STUDY_CONTENTS_1;
        else if($stateParams.type == EN_TOPIC)
            $scope.address = STUDY_CONTENTS_2;
        else if($stateParams.type == KR_GRAMMAR)
            $scope.address = STUDY_CONTENTS_3;
        else if($stateParams.type == KR_TOPIC)
            $scope.address = STUDY_CONTENTS_4;
    });
})