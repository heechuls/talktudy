angular.module('starter.services', [])
.service('LoginService', function($q) {
    return {        
        loginUser: function(pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            DBHandler.isPasswordMatched(1, pw, deferred);

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

.service("StudyItems", function() {
    var List = new Array();
})
.service("ShopItems", function() {
    var List = new Array();
})
.service("Users", function() {
  var users = [{
    id: 0,
    name: "Hee Chul",
    gender: "/img/female.png",
    speaking: 5,
    pronunciation: 3,
    passed: 7,
    failed: 3
  }, {
    id: 1,
    name: "Hee Jin",
    gender: "/img/male.png",
    speaking: 5,
    pronunciation: 3,
    passed: 7,
    failed: 3
  }];
    return {
    all: function() {
      return users;
    }
    };
})

.factory('Activities', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var activities = [{
    id: 0,
    date: '2016-05-21',
    content: '맥주 2개',
  }, {
    id: 1,
    date: '2016-06-21',
    content: '맥주 과자',
  }];

  return {
    all: function() {
      return activities;
    },
    get: function(activityId) {
      for (var i = 0; i < activities.length; i++) {
        if (activities[i].id === parseInt(activityId)) {
          return activities[i];
        }
      }
      return null;
    }
  };
});