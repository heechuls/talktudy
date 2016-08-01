function init(StudyItems, ShopItems, done) {

    DBHandler.getUserInfo(GLOBALS.MyProfile.userid, function (){
        //Need to perform in Admin side when a user is registered
        //DBHandler.setStudyResultItems(GLOBALS.MyProfile.userid);
        DBHandler.saveDeviceToken(GLOBALS.MyProfile.userid, GLOBALS.MyProfile.token, 
            ionic.Platform.isIOS() == true || ionic.Platform.isIPad() == true ? 0 : 1 );
        DBHandler.getStudyResult(GLOBALS.MyProfile.userid, function (retval) {
            StudyItems.List = retval.slice(0); //Copying Array
            if (done != null)
                done();
        });
        DBHandler.LoadPasswordList();
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
        title: STRING_STUDY_CREDIT_CONSUMED,
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
                DBHandler.participateInClassToday(GLOBALS.MyProfile.userid, true, function(){
                    console.log("Participated")
                    refreshList();
                });    
            } else {
                DBHandler.participateInClassToday(GLOBALS.MyProfile.userid, false, function(){
                    console.log("Unparticipated")
                    refreshList();
                });
            }
        });    
    }
}
function testCode(){
 /*   document.addEventListener('deviceready', function () {
    document.addEventListener("backbutton", function(){
        var iframe = document.getElementById('contents');
        iframe.contentWindow.history.go(-1);
    }, false);
    },false);*/

    //DBHandler.createTodayClass("shin");
    /*DBHandler.addShopItem2('맥주', 5000, "병");
    DBHandler.addShopItem2('소주', 3000, "병");
    DBHandler.addShopItem2('새우깡', 1500, "봉지");
    DBHandler.addShopItem2('오징어칩', 1000, "봉지");
    */    

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
}