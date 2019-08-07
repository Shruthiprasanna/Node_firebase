import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import config from "../firebase";
require("date-utils");

firebase.initializeApp(config);

//Sign Up 

document.getElementById("submitSignUp").addEventListener("click", evt => {
    evt.preventDefault();
    const email = document.getElementById("emailNew").value;
    const tryPassword = document.getElementById("passwordNew").value;
    const confirmedPassword = document.getElementById("confirmPassword").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    if (validateEmail(email) || email != "") {
        if (validateTextOnly(firstName) || firstName != "") {
            if (validateTextOnly(lastName) || lastName != "") {
                if (tryPassword == confirmedPassword || tryPassword != "" || confirmedPassword != "") {
                    const password = tryPassword;
                    if (validatePassword(password)) {
                        const dateCreated = Date.today().toFormat("YYYY-MM-DD");
                        firebase.auth().createUserWithEmailAndPassword(email, password).then(
                            () => {
                                //Save information for the user
                                const sUser = firebase.auth().currentUser.uid;
                                firebase.database().ref("user/" + sUser).set({
                                    userType: "pending",
                                    email: email,
                                    password: password,
                                    firstName: firstName,
                                    lastName: lastName,
                                    dateCreated: dateCreated
                                }).then(() => {
                                    //Then redirect to payment page
                                    window.location.replace("../pages/payment.html");
                                });
                            }
                        ).catch(function (error) {
                            // Handle Errors here.
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            document.getElementById("signUpError").innerHTML = "Sign Up Error: " + errorCode + ". " + errorMessage;
                            console.log("Something went wrong:" + errorCode + "." + errorMessage);
                            if (errorCode == "auth/email-already-in-use") {
                                document.getElementById("signUpError").innerHTML = "It looks like you already have an account. Did you mean to <a href=\"../pages/login.html\">login</a> instead?";
                            }
                        });
                    }
                    else {
                        document.getElementById("signUpError").innerHTML = "The password entries don't seem to match! Please try again";
                    }
                } else {
                    document.getElementById("signUpError").innerHTML = "The password is too short. Try something that is at least 6 characters long.";
                }
            } else {
                document.getElementById("signUpError").innerHTML = "Last name must be filled and can only be letters";
            }
        } else {
            document.getElementById("signUpError").innerHTML = "First name must be filled can only be letters";
        }
    } else {
        document.getElementById("signUpError").innerHTML = "Looks like either that wasn't an email address or that field was left empty... Let's try again!";
    }
});

//Regex for Email - Validate email is well formed
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateTextOnly(name) {
    var re = /^[a-zA-Z]+$/;
    return re.test(name);
}

//Password must be at least 6 letters long
function validatePassword(password) {
    var re = /^(?=.{6,})/;
    return re.test(password);
}


