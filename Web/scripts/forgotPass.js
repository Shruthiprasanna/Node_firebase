import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import config from "../firebase";
require("date-utils");

firebase.initializeApp(config);

//Password reset
document.getElementById("submitEmail").addEventListener("click", evt => {
    evt.preventDefault();
    var userEmail = document.getElementById("email").value;
    firebase.auth().sendPasswordResetEmail(userEmail).then(() => {
        document.getElementById("userError").innerHTML = "Password reset link sent! <br> Follow the link to reset your password, then come back here to <a href=\"../pages/login.html\">Login.</a>";
    }).catch(() => {
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById("userError").innerHTML = "Something went wrong: " + ". " + errorMessage;
        console.log("Error:" + errorCode + "." + errorMessage);
    });
});
