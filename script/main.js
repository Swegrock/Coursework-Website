//We need a variable to determine whether it is shown or not to prevent it being shown twice on mobiles.
//And also some children have delayed animations which would need to be cancelled.
var navbar_shown = false;

//The variable which determines whether we're logged in or not.
var logged_in = false;

//Get the elements needed.
const navbar = document.querySelector("nav");
const logo = document.getElementById("logo");
const home = document.getElementById("home-button");
const cv = document.getElementById("cv-button");
const login = document.getElementById("login-menu-button");
const logout = document.getElementById("logout-menu-button");
const new_button = document.getElementById("new-button");
const add_icon = document.getElementById("add-icon");
const view_icon = document.getElementById("view-icon");
const arrow = document.getElementById("arrow");

//Get all header buttons for mobile usage.
const buttons = document.querySelectorAll("header a");

//The starting method.
function start() {
    //We want to hide all the buttons immediately.
    buttons.forEach(link => link.style.display = "none");

    //We want to distinguish whether we should use pc or mobile interaction.
    //Pc interaction occurs on hover where as mobile interaction occurs on press.
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.addEventListener("click", mobileNavHandler);
    }
    else {
        navbar.addEventListener("mouseover", showNav);
        navbar.addEventListener("mouseleave", hideNav);
    }

    var request = new XMLHttpRequest();
    request.addEventListener("readystatechange", loggedInResponse);
    request.open("GET", "php/account.php?logged=true", true);
    request.send();
}

//The response for the getting the login info.
function loggedInResponse() {
    //Check the response type.
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        //1 indicates a successful account creation.
        if (this.responseText == "1") {
            logged_in = true;
        }
    }
}

//The mobile navigation handler, will open and close according to whether the nav bar has been pressed or not.
function mobileNavHandler(eventArgs) {
    if (navbar.contains(eventArgs.target)){
        showNav();
    }
    else {
        hideNav();
    }
}

//Showing the navbar.
function showNav() {
    //If the bars already showing return and do nothing.
    if (navbar_shown) return;
    navbar_shown = true;
    //Display all the buttons.
    buttons.forEach(link => link.style.display = "");
    //Delay by a millisecond to allow style to process.
    setTimeout(() => {
        //Set the attributes of the bars children, preparing it to be shown.
        navbar.style.height = "100%";
        arrow.style.opacity = 0;
        logo.style.opacity = 1;
        home.style.opacity = 1;
        cv.style.opacity = 1;
        view_icon.style.opacity = 1;
        //Check which login button to display and show the correct ones.
        if (logged_in){
            logout.style.opacity = 1;
            add_icon.style.opacity = 1;
            logout.style.cursor = "pointer";
            login.style.display = "none";
            login.style.pointerEvents = "none";
        }
        else {
            new_button.style.pointerEvents = "none";
            login.style.opacity = 1;
            login.style.cursor = "pointer";
            logout.style.display = "none";
            logout.style.pointerEvents = "none";
        }
    }, 10);
}

//Hiding the navbar.
function hideNav() {
    //If the bars already hidden return and do nothing.
    if (!navbar_shown) return;
    navbar_shown = false
    //We wait for half a second before hiding the navbar so it doesn't instantly hide if the user accidentally moves off it.
    setTimeout(() => {
        if (navbar_shown) return;
        //Set the attributes of the bars children, preparing it to be hidden.
        logo.style.opacity = 0;
        home.style.opacity = 0;
        cv.style.opacity = 0;
        login.style.opacity = 0;
        logout.style.opacity = 0;
        add_icon.style.opacity = 0;
        view_icon.style.opacity = 0;
        login.style.cursor = "";
        logout.style.cursor = "";
        navbar.style.height = "50%";
        arrow.style.opacity = 1;
        //Hide all the buttons.
        setTimeout(() => {
            if (navbar_shown) return;
            buttons.forEach(link => link.style.display = "none");
        }, 200);
    }, 500);
}

//Assign the DOM ready method.
document.addEventListener("DOMContentLoaded", start, false);
