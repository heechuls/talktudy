
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

    Date.prototype.yyyymmdd = function() {
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
        var dd  = this.getDate().toString();
        return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]); // padding
    },

    isPasswordMatched: function(id, password){
        firebase.database().ref().child('password/' + id).once('value', function(snapshot){
            console.log(snapshot.val());
            if(snapshot.val() == password)
            return true;
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

    addStudyItem: function(studyid, name){
    //    var newPushKey = firebase.database().ref().child('/study_item/').push().key;
        var update = {};
        update['/study_item/' + studyid] = {
        name : name
        }
        return firebase.database().ref().update(update);
    },

    rateStudyItem: function(userid, name, rate){
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

    participateClass: function(userid, classid, participated)
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
    }
}
