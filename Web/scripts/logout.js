import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import config from "../firebase";
require("date-utils");

firebase.initializeApp(config);

//Logout
document.getElementById("logout").addEventListener("click", () => {
    firebase.auth().signOut().then(() => {
        //Send the user back to the home page
        window.location.replace("../index.html");
        document.getElementById("userMessage").innerHTML = "You have been logged out";
    }).catch(() => {
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById("logoutError").innerHTML = "Something went wrong: " + errorCode + ". " + errorMessage;
        console.log("Error:" + errorCode + "." + errorMessage);
    });
});