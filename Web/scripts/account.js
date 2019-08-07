import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import config from "../firebase";
require("date-utils");

firebase.initializeApp(config);

var firstNameField = document.getElementById("firstName");
var lastNameField = document.getElementById("lastName");
var userError = document.getElementById("accountSettingError");
var emailField = document.getElementById("email");
var submitClick=document.getElementById("save");
var cancelClick=document.getElementById("cancel");
var passwordField = document.getElementById("password");


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        const sUser = firebase.auth().currentUser.uid;
        console.log(sUser);
        firebase.database().ref("user/" + sUser).on("value", (snapshot) => {
            const data = snapshot.val();
            firstNameField.placeholder = data.firstName;
            lastNameField.placeholder = data.lastName;
            emailField.placeholder = data.email;
        });
    }
    else{
        userError.innerHTML="We couldn't find your account information. You may be logged out. Do you want to <a href=\"../pages/login.html\">Login?</a>";
    };
})

firstNameField.addEventListener("blur", evt => {
    var firstName = document.getElementById("firstName").value;
    var valid =validateTextOnly(firstName);
    if (valid==false) {
        userError.innerHTML = "You seem to have changed the value of first name but what you entered doesn't look like a name.";
        firstNameField.focus();
    }
})

cancelClick.addEventListener("click", evt=>{
    window.location.replace("../pages/dashboard.html");
})

submitClick.addEventListener("click", evt=>{
    evt.preventDefault();
    const sUser = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("user/" + sUser);
    if(firstNameField.value){
        ref.update({
            firstName: firstNameField.value
        })
    }
    if (lastNameField.value){
        ref.update({
            lastName: lastNameField.value
        })
    }
    if (emailField.value){
        firebase.auth().currentUser.updateEmail(emailField.value).then(()=>{
            ref.update({
            email: emailField.value
        });
        }).catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode=="auth/requires-recent-login"){
                userError.innerHTML ="Changing your email requires you to login again. <a href=\"../pages/login.html\">Do you want to do that now?</a>"
            }else{
            userError.innerHTML = "We couldn't update your email address. " + errorMessage;
            }
            console.log(errorCode);
        });
    }
    if(passwordField.value){
            firebase.auth().currentUser.updatePassword(passwordField.value).then(()=>{
            ref.update({
            password: passwordField.value});
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == "auth/requires-recent-login") {
                userError.innerHTML = "Changing your password requires you to login again. <a href=\"../pages/login.html\">Do you want to do that now?</a>"
            } else {
                userError.innerHTML = "We couldn't update your password. " + errorMessage;
            }
            console.log(errorCode);
        });
    }
})

