var firebase = require("firebase-admin");
var serviceAccount = require("./firebaseAccountInfo.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://smartsimpleseo-141f3.firebaseio.com"
});

var db = firebase.database();
var ref = db.ref("user");


var getUsers = function() {
    var aUsers = [];

    ref.once("value", function (users) {

        users.forEach(function(user){
            aUsers.push(user.val());
            console.log(user.val());
        });

    });
    console.log("User list size: " + aUsers.length);
    return aUsers;
}

exports.getUsers =  getUsers;
