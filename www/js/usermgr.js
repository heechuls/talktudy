
var addUser = function(userid, name, phoneno, gender, email, speaking_level, pronunciation_level) {
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

  firebase.database().ref('/user/' + 'shin').on("value", function(snapshot) {
    console.log(snapshot.val());
  });
}

var addClass2 = function(date)
{
    var newPushKey = firebase.database().ref().child('class').push().key;
    var update = {};
    update['/class/' + newPushKey] = date;
    return firebase.database().ref().update(update);
}

var addClass = function(classDate)
{
    var classRef = firebase.database().ref().child('class/');
    var update = {};
    update['/date/'] = date;
    return classRef.update(update);
}

var addClassEnroll = function(userid, count)
{
    this._count = count;
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
}

Date.prototype.yyyymmdd = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]); // padding
}

var isPasswordMatched = function(id, password){
  firebase.database().ref().child('password/' + id).once('value', function(snapshot){
    console.log(snapshot.val());
    if(snapshot.val() == password)
      return true;
    return false;
  });
}

var addShopItem = function(name, price){
    var newPushKey = firebase.database().ref().child('shop_item').push().key;
    var update = {};
    update['/shop_item/' + newPushKey] = {
      name : name,
      price : price
    }
    return firebase.database().ref().update(update);
}

var getPriceOfShopItem = function(name)
{
  var ref = firebase.database().ref().child('shop_item')
  ref.orderByChild("name").equalTo(name).on("child_added", function (snapshot) {
    console.log(snapshot.val().price);
  });
}

var addStudyItem = function(name){
    var newPushKey = firebase.database().ref().child('/study_item/').push().key;
    var update = {};
    update['/study_item/' + newPushKey] = {
      name : name,
    }
    return firebase.database().ref().update(update);
}

var rateStudyItem = function(userid, name)
{
  var ref = firebase.database().ref().child('study_item')
  ref.orderByChild("name").equalTo(name).on("child_added", function (snapshot) {

    console.log(snapshot.val().price);
  });
}