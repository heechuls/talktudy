
var DBHandler = {

    addUser: function(userid, name, phoneno, gender, email, speaking_level, pronunciation_level) {
        var date = new Date().yyyymmdd();
        var user = {
            name : name,
            phoneno : phoneno,
            gender : gender,
            email : email,
            speaking_level : speaking_level,
            pronunciation_level : pronunciation_level,
            registered_date : date
        }

        var userRef = firebase.database().ref('/user/' + userid);
        userRef.update(user);

        firebase.database().ref('/user/' + userid).on("value", function(snapshot) {
            console.log(snapshot.val());
        });
    },

    addClass2: function(date)
    {
        var newPushKey = firebase.database().ref().child('class').push().key;
        var update = {};
        update['/class/' + newPushKey] = date;
        return firebase.database().ref().update(update);
    },
    addClass: function(classDate)
    {
        var classRef = firebase.database().ref().child('class/');
        var update = {};
        update['/date/'] = date;
        return classRef.update(update);
    },

    addClassEnroll: function(userid, count)
    {
        var classRef = firebase.database().ref().child('class_enroll_count/' + userid);
        classRef.once('value', function(snapshot){
        console.log(snapshot.numChildren());
        if(snapshot.exists()){
            update.count += snapshot.val().count;
        }
        return classRef.update(update);
        });

        var date = new Date().yyyymmdd();
        var update = {
            count : count,
            date : date
        };
    },

    isPasswordMatched: function(id, password, deferred){
        firebase.database().ref().child('password/' + id).once('value', function(snapshot){
            console.log(snapshot.val());
            if(snapshot.val() == password)
                deferred.resolve('Welcome ' + name + '!');
            else deferred.reject('Wrong credentials.');

            return false;
        });
    },

    addShopItem: function(name, price){
        var newPushKey = firebase.database().ref().child('shop_item').push().key;
        var update = {};
        update['/shop_item/' + newPushKey] = {
            name : name,
            price : price
        }
        return firebase.database().ref().update(update);
    },

    getPriceOfShopItem: function(name)
    {
        var ref = firebase.database().ref().child('shop_item')
        ref.orderByChild("name").equalTo(name).on("child_added", function (snapshot) {
            console.log(snapshot.val().price);
        });
    },

    addStudyItem2: function(studyid, name){
        var update = {};
        update['/study_item/' + studyid] = name;
        return firebase.database().ref().update(update);
    },

    rateStudyItem2: function(userid, name, rate){
        var ref = firebase.database().ref().child('study_item')
        ref.orderByChild("name").equalTo(name).on("child_added", function (snapshot) {
            var study_result = firebase.database().ref().child('/study_result/');
            var update = {};
            update[userid + '/' + snapshot.key] = {
                rate : rate
            }
            study_result.update(update);
        });
    },

    rateStudyItem: function(userid, name, rate){
        var ref = firebase.database().ref().child('/study_result/' +  userid);


        ref.orderByChild("name").equalTo(name).on("child_added", function (snapshot) {
            var study_result = firebase.database().ref().child('/study_result/');
            var update = {};
            update[userid + '/' + snapshot.key] = {
                rate : rate
            }
            study_result.update(update);
        });
    },

    buyItem2: function(classid, userid, shop_item_id, purchaed_count)
    {
        var ref = firebase.database().ref().child('/purchaed_shop_item/');
        var update = {};
        update[classid + '/' + userid + '/' + shop_item_id] = purchaed_count;
        return ref.update(update);
    },

    //class activity record into study_activity
    participateClass: function(classid, userid, participated)
    {
        var ref = firebase.database().ref().child('/study_activity/');
        var update = {};
        if(participated){
            update[userid + '/' + classid] = 1;
        }
        else{
            update[userid + '/' + classid] = 0;
        }
        return ref.update(update);
    },

    buyItem: function(userid, classid, shop_item_id, purchased_count)
    {
        var ref = firebase.database().ref().child('/study_activity/' + userid + '/' + classid + '/shop_item/' + shop_item_id);
        ref.once('value', function(snapshot){
            if(snapshot.exists()){
                console.log(snapshot.val());
                purchased_count += snapshot.val();
        }
        return ref.set(purchased_count);
        });
    },

    participatedClass: function(userid, classid, participated)
    {
        var ref = firebase.database().ref().child('/study_activity/');
        var update = {};
        if(participated){
            update[userid + '/' + classid + '/' + 'class_participation'] = 1;
        }
        else{
            update[userid + '/' + classid + '/' + 'class_participation'] = 0;
        }
        return ref.update(update);
    },

    participatePhoneTalk: function(userid, classid, participated)
    {
        var ref = firebase.database().ref().child('/study_activity/');
        var update = {};
        if(participated){
            update[userid + '/' + classid + '/' + 'phonetalk_participation'] = 1;
        }
        else{
            update[userid + '/' + classid + '/' + 'phonetalk_participation'] = 0;
        }
        return ref.update(update);
    },
    getStudyItems: function (ret) {
        var ref = firebase.database().ref().child('/study_item/');
        ref.once("value", function (allMessagesSnapshot) {
            var retVal = new Array();

            allMessagesSnapshot.forEach(function (messageSnapshot) {
                // Will be called with a messageSnapshot for each child under the /messages/ node
                retVal.push(messageSnapshot.val());
            });
            ret(retVal);
        });
    },
    getStudyResult: function (ret, userid) {
        var ref = firebase.database().ref().child('/study_result/' + userid);
        ref.once("value", function (allMessagesSnapshot) {
            var retVal = new Array();

            allMessagesSnapshot.forEach(function (messageSnapshot) {
                // Will be called with a messageSnapshot for each child under the /messages/ node
                retVal.push(messageSnapshot.val());
            });
            ret(retVal);
        });
    },
    getUserInfo: function (done, userid) {
        var ref = firebase.database().ref().child('/user/' + userid);
        ref.once("value", function (dataSnapshop) {
            if(dataSnapshop.exists()){
                console.log(dataSnapshop.val());
                MyProfile.email = dataSnapshop.email;
                MyProfile.gender = dataSnapshop.val().gender;
                MyProfile.name = dataSnapshop.val().name;
                MyProfile.phoneno = dataSnapshop.val().phoneno;
                MyProfile.speaking_level = dataSnapshop.val().speaking_level;
                MyProfile.pronunciation_level = dataSnapshop.val().pronunciation_level;
                MyProfile.email = dataSnapshop.val().email;
            }            
        });
    },
    setStudyResultItems: function (userid) {
        var study_items = ["시제", "완료", "조동사", "To부정사", "동명사", "수동태", "전치사", "관계대명사",
            "접속사", "부사", "형용사", "가정법", "비교급", "수량", "비인칭 주어", "가족", "애완동물", "도둑/강도",
            "스포츠", "레저/취미", "패션", "로또", "여행", "맛집", "꿈", "미드", "친구", "북한", "결혼", "연애"];
        for (var i in study_items) {
            addStudyItem2(i, study_items[i]);
        }
    }
    ,
    setStudyReultItem: function(userid, studyid, name){
        var update = {};
        update['/study_result/' + userid + "/" + studyid] = name;
        return firebase.database().ref().update(update);
    }
}
var MyProfile = {};

Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = this.getDate().toString();
    return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]); // padding
}