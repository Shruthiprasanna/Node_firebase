import firebase, { database } from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import config from "../firebase";
require("date-utils");

firebase.initializeApp(config);

function verifyUser(){
    var sUser = firebase.auth().currentUser.uid;
    firebase.database().ref("user/" + sUser).on("value", (snapshot) => {
        var oUsers = snapshot.val();
        var userType = oUsers.userType;
        return userType;
    })
}


