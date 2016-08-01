
var showToast = function ($cordovaToast, message, duration, location) {
    $cordovaToast.show(message, duration, location).then(function (success) {
        console.log("The toast was shown");
    }, function (error) {
        console.log("The toast was not shown due to " + error);
    });
};

var GLOBALS = {
    MyProfile : {isLoggedIn : false},
    Password : new Array(),

    RATE_PASSED : 1,
    RATE_FAILED : 2,
    RATE_UNREVIEWED : 0,

    USER_VALID : 1,
    USER_INVALID : 2,
    USER_NONE : 3,
    USER_ADMIN : 4,

    STUDY_CONTENTS_1 : "http://talktudy.herokuapp.com/grammar",
    STUDY_CONTENTS_2 : "http://talktudy.herokuapp.com/category",
    STUDY_CONTENTS_3 : "http://talktudy.herokuapp.com/grammar_kr",
    STUDY_CONTENTS_4 : "http://talktudy.herokuapp.com/category_kr",

    EN_GRAMMAR : 1,
    EN_TOPIC : 2,
    KR_GRAMMAR : 3,
    KR_TOPIC : 4,

    PASSWORD_ADMIN : 1,

    PAGE_UPDATE : "http://lunar-pic.com:6500/download",
    UPLOAD_SERVER : "http://lunar-pic.com:6500/upload",

    isNoticeReceived : false,
    isPhoneTalkConfirmReceived : false,
    isStudyConfirmReceived : false,

    ReceivedNotifications : {},

    class_expired : '<p style:"text-align:center;font-size:16px">스터디가 모두 소진되었습니다.</p><p style="text-align:center;font-size:16px">아래의 계좌로 입금 부탁드립니다.</p><br/><br/><p style="text-align:center;font-size:16px;">국민은행<br/>642601-01-571098<br/>이성암</p></p></div>'
};
