//Variable for knowing if the login window is showing.
var loginShowing = false;
//Variable for knowing if the register window is showing.
var registerShowing = false;

//Get the elements needed.
const loginWindow = document.querySelector("#login");
const loginForm = document.querySelector("#loginform");
const loginUsername = document.querySelector("#loginusername");
const loginPassword = document.querySelector("#loginpassword");
const loginButton = document.querySelector("#loginbutton");
const loginError = document.querySelector("#loginerror");
const showRegisterButton = document.querySelector("#showregister");

const registerWindow = document.querySelector("#register");
const registerForm = document.querySelector("#registerform");
const registerUsername = document.querySelector("#registerusername");
const registerPassword = document.querySelector("#registerpassword");
const registerButton = document.querySelector("#registerbutton");
const registerError = document.querySelector("#registererror");

const dimmer = document.querySelector(".dimmer");

const closeButtons = document.querySelectorAll(".closebutton");
const showLoginButtons = document.querySelectorAll(".showlogin");
const logoutUserButtons = document.querySelectorAll(".logoutuser");

//The starting method.
function start() {
    //Assign show register button.
    showRegisterButton.addEventListener("click", showRegister);
    registerButton.addEventListener("click", registerUser);
    loginButton.addEventListener("click", loginUser);

    //Clicking the dimmer will cause all the open forms to close.
    //This is common practice for websites and has been observed all over.
    dimmer.addEventListener("click", closeForms);

    //Add the correct methods to all the children of it.
    closeButtons.forEach(child => child.addEventListener("click", closeForms));
    showLoginButtons.forEach(child => child.addEventListener("click", showLogin));
    logoutUserButtons.forEach(child => child.addEventListener("click", logoutUser));    

    //Hide the login and register windows so they can't be tabbed to by accident.
    loginWindow.style.display = "none";
    registerWindow.style.display = "none";
}

//Show the login window if we aren't logged in already.
function showLogin() {
    if (loginShowing || sessionStorage.getItem("loggedin") != null) return;
    else if (registerShowing) {
        hideRegister();
    }
    showDimmer();
    //Reset the form so no previous entries are present.
    loginForm.reset();
    loginWindow.style.display = "";
    loginShowing = true;
    loginWindow.style.animation = "slidein 1s forwards";
}

//Hide the login window.
function hideLogin() {
    if (!loginShowing) return;
    loginShowing = false;
    loginError.style.display = "";
    loginWindow.style.animation = "slideout 1s forwards";
    setTimeout(() => {
        if (loginShowing) return;
        loginWindow.style.display = "none";
    }, 1000);
}

//Tries to log the user in.
function loginUser() {
    //Firstly we want to check to see if the login usernames key correlates to the password value in the storage.
    if (localStorage.getItem(loginUsername.value) === loginPassword.value){
        //If it does, we'll log in for the session.
        sessionStorage.setItem('loggedin', localStorage.getItem(document.querySelector("#loginusername").value));
        closeForms();
    }
    else {
        //If not we need to notify the user we haven't been successful by showing the error message and shaking the window.
        shakeWindow(loginWindow);
        loginError.style.display = "block";
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
    if (registerShowing) return;
    else if (loginShowing) {
        hideLogin();
    }
    showDimmer();
    //Reset the form so no previous entries are present.
    registerForm.reset();
    registerWindow.style.display = "";
    registerShowing = true;
    registerWindow.style.animation = "slidein 1s forwards";
}

//Hide the register window.
function hideRegister() {
    if (!registerShowing) return;
    registerShowing = false;
    registerError.style.display = "";
    registerWindow.style.animation = "slideout 1s forwards";
    setTimeout(() => {
        if (registerShowing) return;
        registerWindow.style.display = "none";
    }, 1000);
}

//Tries to register the user.
function registerUser() {
    //We want to make sure the inputs aren't empty and the user has checked the licence agreement.
    if (!registerForm.checkValidity()){
        //Shake the window to visually show something is wrong.
        shakeWindow(registerWindow);
        //Tell them they've not filled in all the details using the default validation message.
        registerError.innerHTML = "Please fill in all the fields."
        //Tell the user which field they're missing.
        registerForm.reportValidity();
        //Show the error message.
        registerError.style.display = "block";
        //Return so the registration doesn't complete.
        return;
    }
    //We also want to make sure the username isn't already in use.
    if (localStorage.getItem(registerUsername.value) != null) {
        //Shake the window to visually show something is wrong.
        shakeWindow(registerWindow);
        //Tell them the username is in use.
        registerError.innerHTML = "Username is already in use.";
        //Show the error message.
        registerError.style.display = "block";
        //Return so the registration doesn't complete.
        return;
    }
    //Then we can create a new user.
    localStorage.setItem(registerUsername.value, registerPassword.value);
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