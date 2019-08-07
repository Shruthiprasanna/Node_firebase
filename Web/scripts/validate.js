

function validateEmail(email) {
    var re = /^.+@.+\..+$/;
    return re.test(email);
}

function validateTextOnly() {
    var re = /^[a-zA-Z]+$/;
    return re.test(name);
}

//Password must be at least 6 letters long
function validatePassword(password) {
    var re = /^(?=.{6,})/;
    return re.test(password);
}