
var MyProfile = {};
var Password = new Array();
var ShopItems = new Array();
var Activities2 = new Array();

showToast = function ($cordovaToast, message, duration, location) {
    $cordovaToast.show(message, duration, location).then(function (success) {
        console.log("The toast was shown");
    }, function (error) {
        console.log("The toast was not shown due to " + error);
    });
}