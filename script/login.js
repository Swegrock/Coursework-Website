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

//Tries to log the user in.
function loginUser() {
    //Get the password stored in the local storage value.
    let password = localStorage.getItem(login_username.value);
    //Firstly we want to check to see if the login usernames key correlates to the password value in the storage.
    if (password === login_password.value){
        //If it does, we'll log in for the session.
        sessionStorage.setItem('loggedin', login_username.value);
        location.reload();
    }
    else {
        //If not we need to notify the user we haven't been successful by showing the error message and shaking the window.
        shakeWindow(login_window);
        login_error.style.display = "block";
    }
}

//Logout the currently logged in user by deleting the session storage.
function logoutUser() {
    if (sessionStorage.getItem("loggedin") == null) return;
    sessionStorage.removeItem("loggedin");
    location.reload();
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
    //We also want to make sure the username isn't already in use.
    if (localStorage.getItem(register_username.value) != null) {
        //Shake the window to visually show something is wrong.
        shakeWindow(register_window);
        //Tell them the username is in use.
        register_error.innerHTML = "Username is already in use.";
        //Show the error message.
        register_error.style.display = "block";
        //Return so the registration doesn't complete.
        return;
    }
    //Then we can create a new user.
    localStorage.setItem(register_username.value, register_password.value);
    //If all has worked we can now show the login form.
    showLogin();
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