//Variable for knowing if the login window is showing.
var login_showing = false;
//Variable for knowing if the register window is showing.
var register_showing = false;

//Get the elements needed.
const login_window = document.getElementById("login");
const login_form = document.getElementById("login-form");
const login_username = document.getElementById("login-username");
const login_password = document.getElementById("login-password");
const login_button = document.getElementById("login-button");
const login_error = document.getElementById("login-error");
const show_register_button = document.getElementById("show-register");

const register_window = document.getElementById("register");
const register_form = document.getElementById("register-form");
const register_username = document.getElementById("register-username");
const register_password = document.getElementById("register-password");
const register_button = document.getElementById("register-button");
const register_error = document.getElementById("register-error");

const dimmer = document.querySelector(".dimmer");

const close_buttons = document.querySelectorAll(".close-button");
const show_login_buttons = document.querySelectorAll(".show-login");
const logout_user_buttons = document.querySelectorAll(".logout-user");

//The starting method.
function start() {
    //Assign show register button.
    show_register_button.addEventListener("click", showRegister);
    register_button.addEventListener("click", registerUser);
    login_button.addEventListener("click", loginUser);

    //Assign the press enter to login mechanism.
    login_username.addEventListener("keypress", keyPressedLogin);
    login_password.addEventListener("keypress", keyPressedLogin);

    //Clicking the dimmer will cause all the open forms to close.
    //This is common practice for websites and has been observed all over.
    dimmer.addEventListener("click", closeForms);

    //Add the correct methods to all the children of it.
    close_buttons.forEach(child => child.addEventListener("click", closeForms));
    show_login_buttons.forEach(child => child.addEventListener("click", showLogin));
    logout_user_buttons.forEach(child => child.addEventListener("click", logoutUser));    

    //Hide the login and register windows so they can't be tabbed to by accident.
    login_window.style.display = "none";
    register_window.style.display = "none";
}

//Show the login window if we aren't logged in already.
function showLogin() {
    if (login_showing || sessionStorage.getItem("loggedin") != null) return;
    else if (register_showing) {
        hideRegister();
    }
    showDimmer();
    //Reset the form so no previous entries are present.
    login_form.reset();
    login_window.style.display = "";
    login_showing = true;
    login_window.style.animation = "slide-in 1s forwards";
}

//Hide the login window.
function hideLogin() {
    if (!login_showing) return;
    login_showing = false;
    login_error.style.display = "";
    login_window.style.animation = "slide-out 1s forwards";
    setTimeout(() => {
        if (login_showing) return;
        login_window.style.display = "none";
    }, 1000);
}

//When the enter key is pressed we want to login.
function keyPressedLogin(eventArgs) {
    if (eventArgs.keyCode == 13) {
        loginUser();
    }
}

//Tries to log the user in.
function loginUser() {
    //Firstly we want to check to see if the login usernames key correlates to the password value in the storage.
    attemptLoginUser(login_username.value, login_password.value);
}

//Logout the currently logged in user.
function logoutUser() {
    //Send a request to logout the account.
    var request = new XMLHttpRequest();
    request.addEventListener("readystatechange", logoutAccountResponse);
    request.open("GET", "php/account.php?logout");
    request.send();
    location.reload();
}

//The response for the logging in.
function logoutAccountResponse() {
    //Check the response type.
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        //1 indicates a successful account creation.
        if (this.responseText == "1") {
            location.reload();
        }
    }
}

//Show the register window.
function showRegister() {
    if (register_showing) return;
    else if (login_showing) {
        hideLogin();
    }
    showDimmer();
    //Reset the form so no previous entries are present.
    register_form.reset();
    register_window.style.display = "";
    register_showing = true;
    register_window.style.animation = "slide-in 1s forwards";
}

//Hide the register window.
function hideRegister() {
    if (!register_showing) return;
    register_showing = false;
    register_error.style.display = "";
    register_window.style.animation = "slide-out 1s forwards";
    setTimeout(() => {
        if (register_showing) return;
        register_window.style.display = "none";
    }, 1000);
}

//Tries to register the user.
function registerUser() {
    //We want to make sure the inputs aren't empty and the user has checked the licence agreement.
    if (!register_form.checkValidity()){
        //Shake the window to visually show something is wrong.
        shakeWindow(register_window);
        //Tell them they've not filled in all the details using the default validation message.
        register_error.innerHTML = "Please fill in all the fields."
        //Tell the user which field they're missing.
        register_form.reportValidity();
        //Show the error message.
        register_error.style.display = "block";
        //Return so the registration doesn't complete.
        return;
    }
    //Then we can try and create a new user.
    createAccount(register_username.value, register_password.value);
}

//Create a new user account.
function createAccount(username, password) {
    //Send a request to create the account.
    var request = new XMLHttpRequest();
    request.addEventListener("readystatechange", createAccountResponse);
    request.open("GET", "php/account.php?add&username="+ username + "&password=" + password, true);
    request.send();
}

//The response for the account creation.
function createAccountResponse() {
    //Check the response type.
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        //1 indicates a successful account creation.
        if (this.responseText == "1") {
            //So we can show the login form.
            showLogin();
        }
        //If the account was not created successfully we can assume the username is in use.
        else {
            //Shake the window to visually show something is wrong.
            shakeWindow(register_window);
            //Tell them the username is in use.
            register_error.innerHTML = "Username is already in use.";
            //Show the error message.
            register_error.style.display = "block";
            //Return so the registration doesn't complete.
            return;
        }
    }
}

//Try to login the user.
function attemptLoginUser(username, password) {
    //Send a request to create the account.
    var request = new XMLHttpRequest();
    request.addEventListener("readystatechange", loginAccountResponse);
    console.log("php/account.php?login&username="+ username + "&password=" + password);
    request.open("GET", "php/account.php?login&username="+ username + "&password=" + password, true);
    request.send();
}

//The response for the logging in.
function loginAccountResponse() {
    //Check the response type.
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        //1 indicates a successful account creation.
        if (this.responseText == "1") {
            location.reload();
        }
        //If the username or password was wrong.
        else {
            //Shake the window to visually show something is wrong.
            shakeWindow(login_window);
            //Tell them that the Username or password is incorrect.
            login_error.innerHTML = "Username or password incorrect";
            //Show the error message.
            login_error.style.display = "block";
        }
    }
}

//Plays a small shaking animation on the window.
function shakeWindow(element) {
    element.style.animation = "shake 300ms forwards";
    setTimeout(() => {
        element.style.animation = "still 0ms forwards";
    }, 300);
}

//Hide all the login windows and the dimmer.
function closeForms() {
    hideLogin();
    hideRegister();
    hideDimmer();
}

//Show the dimmer.
function showDimmer() {
    dimmer.style.display = "block";
    setTimeout(() => {
        dimmer.style.opacity = 0.8;
    }, 10);
}

//Hide the dimmer.
function hideDimmer() {
    dimmer.style.opacity = 0;
    setTimeout(() => {
        dimmer.style.display = "";
    }, 1000);
}

//Assign the DOM ready method.
document.addEventListener('DOMContentLoaded', start, false);