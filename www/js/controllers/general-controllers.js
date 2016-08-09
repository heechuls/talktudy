angular.module('starter.controllers')
    .controller('LoginCtrl', function ($scope, LoginService, StudyItems, ShopItems, $ionicPopup, $state, $sce, $ionicPlatform, $ionicNavBarDelegate, $window/*, $ionicPush, $ionicPlatform*/) {
        /*$ionicPlatform.registerBackButtonAction(function () {
        if (condition) {
            navigator.app.exitApp();
        } else {
            handle back action!
        }
        }, 100);*/
        $ionicNavBarDelegate.showBackButton(false);
        $scope.$on("onNotification", function (args) {
            notificationHandlerForNotice(args, $ionicPopup);
        });
        $scope.$on('$ionicView.loaded', function () {
            //load credential from local storage
            $scope.data.phonenumber = $window.localStorage.getItem(GLOBALS.STORAGE_USERID);
            $scope.data.password = $window.localStorage.getItem(GLOBALS.STORAGE_PASSWORD);
        });
        $scope.data = {};
        //pushSetup();
        $scope.login = function () {
            DBHandler.isUserValid($scope.data.phonenumber, function (retVal) {
                if (retVal == GLOBALS.USER_VALID || retVal == GLOBALS.USER_ADMIN) {
                    if (retVal == GLOBALS.USER_ADMIN)
                        GLOBALS.MyProfile.isAdmin = true;

                    LoginService.loginUser($scope.data.password).success(function (data) {
                        $state.go('mainguide');
                        GLOBALS.MyProfile.userid = $scope.data.phonenumber;
                        GLOBALS.MyProfile.isLoggedIn = true;
                        init(StudyItems, ShopItems, true, function () {
                            if (GLOBALS.MyProfile.remained_class == 0) {
                                showClassExpirePopup($ionicPopup);
                            }
                            //save credential in local storage
                            $window.localStorage.setItem(GLOBALS.STORAGE_USERID, GLOBALS.MyProfile.userid);
                            $window.localStorage.setItem(GLOBALS.STORAGE_PASSWORD, $scope.data.password);
                        });
                    }).error(function (data) {
                        var alertPopup = $ionicPopup.alert({
                            title: STRING.LOGIN_FAIL,
                            template: STRING.CONFIRM_PASSWORD
                        });
                    });
                    console.log(" - PW: " + $scope.data.password);
                }
                else if (retVal == GLOBALS.USER_INVALID) {
                    var alertPopup = $ionicPopup.alert({
                        title: STRING.LOGIN_FAIL,
                        template: STRING.EXPIRED_ACCOUNT
                    });
                }
                else if (retVal == GLOBALS.USER_NONE) {
                    var alertPopup = $ionicPopup.alert({
                        title: STRING.LOGIN_FAIL,
                        template: STRING.NO_ACCOUNT
                    });
                }
            });
        }

        function pushSetup() {
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
                GLOBALS.MyProfile.token = token;
            });
        }
    })
    .controller('VersionCheckCtrl', function ($scope, $state, $window, $cordovaInAppBrowser, Version) {
        $scope.text = STRING.VERSION_CHECKING;
        $scope.style = "none";

        $scope.goupdate = function () {
            //$window.open(GLOBALS.PAGE_UPDATE);
            openInAppBrowser(GLOBALS.PAGE_UPDATE, $cordovaInAppBrowser);
        }
        $scope.$on('$ionicView.beforeEnter', function () {
            Version.isVersionMatched(function (retval) {
                if (retval == true)
                    $state.go("login");
                else {
                    $scope.style = "show";
                    $scope.text = STRING.OLD_VERSION;

                }
            });
        });

    })
    .controller('UserProfileCtrl', function ($scope, $state, $stateParams, Users) {
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        });
        $scope.$on('$ionicView.loaded', function () {
            Users.get($stateParams.userid, function (profile) {
                $scope.profile = profile;
                DBHandler.getStudyResult($stateParams.userid, function (study_result) {
                    if ($scope.profile.gender == 1)
                        document.getElementById("profile-image").src = "img/female.png";
                    $scope.study_items = chunk(study_result.slice(0), 5); //Copying Array
                    $scope.$apply();
                });
            });
        });
    })
    .controller('JoinerListCtrl', function ($scope, $state, _) {
        var rotate = false;
        var reset = false;
        $scope.done_matching = false;

        $scope.matches = {
            "natives" : [],
            "koreans" : []
        };

        $scope.matched = [];
        $scope.unmatched = [];

        $scope.natives = [];
        $scope.koreans = [];

        var levels = { "1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [] };
        var range = { "1": ["2"], "2": ["1"], "3": ["4"], "4": ["3", "5", "6"], "5": ["4", "6", "7"], "6": ["4", "5", "7"], "7": ["5", "6"] };

        $scope.$on('$ionicView.enter', function () {
            DBHandler.getClassParticipants(new Date().yyyymmdd(), function (retval) {
                $scope.users = retval.slice(0);
                $scope.date = new Date().toDateString();
                $scope.$apply();
                classifyUsers();
            });
        });

        function classifyUsers() {
            _.each($scope.users, function(user, id) {
                user.matched = [];
                if (user.userid > "01028225330") {
                    $scope.natives.push(user);
                } else {
                    user.matched_native = false;
                    levels[user.speaking_level].push(user);
                    $scope.koreans.push(user);
                }
            });

            $scope.$apply();
        }

        $scope.getNames = function(arr) {
            var ret = [];
            _.each(arr, function(id, idx) {
                ret[idx] = _.find($scope.users, function(user) { return user.userid == id}).name;
            });
            
            var str = "";

            _.each(ret, function(name, idx) {
                if (idx != 0) {
                    str += " - "
                }
                str += name;
            });

            return str;
        }

        var getUser = function(id) {
            return _.find($scope.users, function(user) { return user.userid == id });
        }

        var getGender = function(id) {
            return getUser(id).gender;
        }

        var getSpeakingLevel = function(user) {
            return parseInt(user.speaking_level);
        }

        var findNativeMatch = function(user, list) {
            var match = _.find(list, function(candidate) {
                return !(_.contains($scope.matched, candidate.userid)) && !(_.contains(user.matched, candidate.userid)) && candidate.gender != user.gender && !candidate.matched_native && getSpeakingLevel(candidate) >= 4;
            });

            if (!match) {
                match = _.find(list, function(candidate) {
                    return !(_.contains($scope.matched, candidate.userid)) && !(_.contains(user.matched, candidate.userid)) && candidate.gender != user.gender && getSpeakingLevel(candidate) >= 4;
                });
            }

            if (!match) {
                match = _.find(list, function(candidate) {
                    return !(_.contains($scope.matched, candidate.userid)) && !(_.contains(user.matched, candidate.userid)) && getSpeakingLevel(candidate) >= 4;
                });
            }

            if (!match) {
                match = _.find(list, function(candidate) {
                    return !(_.contains($scope.matched, candidate.userid)) && getSpeakingLevel(candidate) >= 4;
                });
            }

            if (!match) {
                // console.log('undefined');
            }

            return match;
        }

        var findMatch = function(user, list) {
            var match = _.find(list, function(candidate) {
                return !(_.contains($scope.matched, candidate.userid)) && !(_.contains(user.matched, candidate.userid)) && candidate.gender != user.gender && user.speaking_level != candidate.speaking_level && candidate.userid != user.userid;
            });

            if (!match) {
                match = _.find(list, function(candidate) {
                    return !(_.contains($scope.matched, candidate.userid)) && !(_.contains(user.matched, candidate.userid)) && user.speaking_level != candidate.speaking_level && candidate.userid != user.userid;
                });
            }

            if (!match) {
                match = _.find(list, function(candidate) {
                    return !(_.contains($scope.matched, candidate.userid)) && !(_.contains(user.matched, candidate.userid)) && candidate.userid != user.userid;
                });
            }

            if (!match) {
                match = _.find(list, function(candidate) {
                    return !(_.contains($scope.matched, candidate.userid)) && candidate.userid != user.userid;
                })
            }

            if (!match) {
                // console.log('undefined');
            }

            return match;
        }

        $scope.match = function() {
            if (rotate) { rotate_match() }
            if (reset) { reset_match() }

            _.each($scope.natives, function(native) {
                korean = findNativeMatch(native, $scope.koreans);
                if (!korean) {

                }

                native.matched.push(korean.userid);
                korean.matched.push(native.userid);
                korean.matched_native = true;

                $scope.matched.push(native.userid);
                $scope.matched.push(korean.userid);
                
                $scope.matches.natives.push([native.userid, korean.userid]);
            });

            for (var i = 7; i > 0; i--) {
                var key = i.toString();

                _.each(levels[key], function(user) {
                    if (_.contains($scope.matched, user.userid)) { return; }
                    var list = [];
                    _.each(range[key], function(users) {
                        list = list.concat(levels[users]);
                    });

                    list = list.concat(levels[key]);

                    var match = findMatch(user, list);

                    if (!match) {
                        $scope.unmatched.push(user.userid);
                    } else if (match.useridid == user.userid) {
                        
                    } else {
                        user.matched.push(match.userid);
                        match.matched.push(user.userid);

                        $scope.matched.push(user.userid);
                        $scope.matched.push(match.userid);

                        $scope.matches.koreans.push([user.userid, match.userid]);
                    }
                });
            }

            if ($scope.unmatched.length != 0) {
                _.each($scope.unmatched, function(user_id) {
                    var user = getUser(user_id);
                    var user_range = range[user.speaking_level].concat(user.speaking_level);
                    var match = _.find($scope.matches.koreans, function(match) {
                        var users = [match[0], match[1]];
                        users[0] = getUser(users[0]);
                        users[1] = getUser(users[1]);
                        return _.contains(user_range, users[0].speaking_level) || _.contains(user_range, users[1].speaking_level);
                    });
                    if (match) {
                        $scope.matches.koreans = _.without($scope.matches.koreans, match);

                        match.push(user_id);

                        $scope.matches.koreans.push(match);

                        $scope.unmatched = _.without($scope.unmatched, user_id);
                    }
                });
            }

            _.each($scope.matches, function(group) {
                _.each(group, function(match) {
                    var genders = [-1, -1];
                    genders[0] = getGender(match[0]);
                    genders[1] = getGender(match[1]);
                    var levels = [-1, -1];
                    levels[0] = getUser(match[0]).speaking_level;
                    levels[1] = getUser(match[1]).speaking_level;
                });
            });

        //    console.log($scope.matches);
        //    console.log($scope.unmatched);

            rotate = true;

            $scope.done_matching = true;
        }

        function rotate_match() {
            $scope.matches = {
                "natives" : [],
                "koreans" : []
            };

            $scope.matched = [];
            $scope.unmatched = [];
        }

        function reset_match() {
            rotate_match();

            $scope.users = _.shuffle($scope.users);
            $scope.natives = _.shuffle($scope.natives);
            $scope.koreans = _.shuffle($scope.koreans);
        }
    });