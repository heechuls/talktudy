
var MyProfile = {};
var Password = new Array();
var ShopItems = new Array();

showToast = function ($cordovaToast, message, duration, location) {
    $cordovaToast.show(message, duration, location).then(function (success) {
        console.log("The toast was shown");
    }, function (error) {
        console.log("The toast was not shown due to " + error);
    });
}

var RATE_PASSED = 1;
var RATE_FAILED = 2;
var RATE_UNREVIEWED = 0