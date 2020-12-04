let loginShowing = false;
let registerShowing = false;

//Get the elements needed.
let loginWindow = document.querySelector("#login");
let loginError = document.querySelector("#loginerror");
let registerWindow = document.querySelector("#register");
let registerError = document.querySelector("#registererror");
let dimmer = document.querySelector(".dimmer");

//Assign the necessary clicking to the right methods.
//A notable part of this is the dimmer onclick method will close all the forms meaning the user does not have to click close.
//This is common practice for websites and I've observed this all over.
dimmer.onclick = function() {
    closeForms();
}
document.querySelectorAll(".closebutton").forEach(button => button.onclick = function() {
    closeForms();
});
document.querySelectorAll(".showlogin").forEach(button => button.onclick = function() {
    showLogin();
});
document.querySelectorAll(".logoutuser").forEach(button => button.onclick = function() {
    logoutUser();
});
document.querySelector("#showregister").onclick = function() {
    showRegister();
}

//Show the login window if we aren't logged in already.
function showLogin() {
    if (loginShowing || sessionStorage.getItem("loggedin") != null) return;
    else if (registerShowing) {
        hideRegister();
    }
    showDimmer();
    loginShowing = true;
    loginWindow.style.animation = "slidein 1s forwards";
}

//Hide the login window.
function hideLogin() {
    if (!loginShowing) return;
    loginShowing = false;
    loginError.style.display = "";
    loginWindow.style.animation = "slideout 1s forwards";
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
    registerShowing = true;
    registerWindow.style.animation = "slidein 1s forwards";
}

//Hide the register window.
function hideRegister() {
    if (!registerShowing) return;
    registerShowing = false;
    registerError.style.display = "";
    registerWindow.style.animation = "slideout 1s forwards";
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

//Hide all the login windows and the dimmer.
function closeForms() {
    hideLogin();
    hideRegister();
    hideDimmer();
}

//When the register button is pressed.
document.querySelector("#registerbutton").onclick = function() {
    //We want to make sure the inputs aren't empty and the user has checked the licence agreement.
    if (document.querySelector("#registerusername").value != ""
    && document.querySelector("#registerpassword").value != ""
    && document.querySelector("#agreebox").checked
    //We also want to make sure the username isn't already being used.
    && localStorage.getItem(document.querySelector("#registerusername").value) == null){
        //Then we can create a new user.
        localStorage.setItem(document.querySelector("#registerusername").value, document.querySelector("#registerpassword").value);
        //If all has worked we can now show the login form.
        showLogin();
    }
    else {
        //If not we need to notify the user we haven't been successful by showing the error message and shaking the window.
        registerWindow.style.animation = "shake 300ms forwards";
        setTimeout(() => {
            registerWindow.style.animation = "still 0ms forwards";
        }, 300);
        registerError.style.display = "block";
    }
}

//When the login button is pressed.
document.querySelector("#loginbutton").onclick = function() {
    //Firstly we want to check to see if the login usernames key correlates to the password value in the storage.
    if (localStorage.getItem(document.querySelector("#loginusername").value) === document.querySelector("#loginpassword").value){
        //If it does, we'll log in for the session.
        sessionStorage.setItem('loggedin', localStorage.getItem(document.querySelector("#loginusername").value));
        closeForms();
    }
    else {
        //If not we need to notify the user we haven't been successful by showing the error message and shaking the window.
        loginWindow.style.animation = "shake 300ms forwards";
        setTimeout(() => {
            loginWindow.style.animation = "still 0ms forwards";
        }, 300);
        loginError.style.display = "block";
    }
}