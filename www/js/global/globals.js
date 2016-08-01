
//var MyProfile = {isLoggedIn : false};
var Password = new Array();
var ShopItems = new Array();

var showToast = function ($cordovaToast, message, duration, location) {
    $cordovaToast.show(message, duration, location).then(function (success) {
        console.log("The toast was shown");
    }, function (error) {
        console.log("The toast was not shown due to " + error);
    });
}

var RATE_PASSED = 1;
var RATE_FAILED = 2;
var RATE_UNREVIEWED = 0;

var USER_VALID = 1;
var USER_INVALID = 2;
var USER_NONE = 3;
var USER_ADMIN = 4;

var STUDY_CONTENTS_1 = "http://talktudy.herokuapp.com/grammar";
var STUDY_CONTENTS_2 = "http://talktudy.herokuapp.com/category";
var STUDY_CONTENTS_3 = "http://talktudy.herokuapp.com/grammar_kr";
var STUDY_CONTENTS_4 = "http://talktudy.herokuapp.com/category_kr";

var EN_GRAMMAR = 1;
var EN_TOPIC = 2;
var KR_GRAMMAR = 3;
var KR_TOPIC = 4;

var PAGE_UPDATE = "//lunar-pic.com:5000/"

var isVersionMatched = false;
var isNoticeReceived = false;
var isPhoneTalkConfirmReceived = false;
var isStudyConfirmReceived = false;

var ReceivedNotifications = {};

var class_expired = '<p style="text-align:center;font-size:16px">스터디가 모두 소진되었습니다.</p><p style="text-align:center;font-size:16px">아래의 계좌로 입금 부탁드립니다.</p><br/><br/><p style="text-align:center;font-size:16px;">국민은행<br/>642601-01-571098<br/>이성암</p></p></div>';