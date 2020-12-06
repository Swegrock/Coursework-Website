//We need a variable to determine whether it is shown or not to prevent it being shown twice on mobiles.
//And also some children have delayed animations which would need to be cancelled.
var navbarShown = false;

//Get the elements needed.
const navbar = document.querySelector("nav");
const logo = document.querySelector("#logo");
const home = document.querySelector("#homebutton");
const cv = document.querySelector("#cvbutton");
const login = document.querySelector("#loginmenubutton");
const logout = document.querySelector("#logoutmenubutton");
const profileIcon = document.querySelector("#profileicon");
const arrow = document.querySelector("#arrow");

//Get all header buttons for mobile usage.
const buttons = document.querySelectorAll("header a");

//The starting method.
function start() {
    //We want to hide all the buttons immediately.
    buttons.forEach(link => link.style.display = "none");

    //We want to distinguish whether we should use pc or mobile interaction.
    //Pc interaction occurs on hover where as mobile interaction occurs on press.
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.addEventListener("mousedown", mobileNavHandler);
    }
    else {
        navbar.addEventListener("mouseover", showNav);
        navbar.addEventListener("mouseleave", hideNav);
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
    if (navbarShown) return;
    navbarShown = true;
    //Display all the buttons.
    buttons.forEach(link => link.style.display = "");
    //Set the attributes of the bars children, preparing it to be shown.
    navbar.style.height = "100%";
    arrow.style.opacity = 0;
    logo.style.opacity = 1;
    home.style.opacity = 1;
    cv.style.opacity = 1;
    //Check which login button to display and show the correct ones.
    if (sessionStorage.getItem("loggedin") != null){
        logout.style.opacity = 1;
        profileIcon.style.opacity = 1;
        logout.style.cursor = "pointer";
    }
    else {
        login.style.opacity = 1;
        login.style.cursor = "pointer";
    }
}

//Hiding the navbar.
function hideNav() {
    //If the bars already hidden return and do nothing.
    if (!navbarShown) return;
    navbarShown = false
    //We wait for half a second before hiding the navbar so it doesn"t instantly hide if the user accidentally moves off it
    setTimeout(() => {
        if (navbarShown) return;
        //Set the attributes of the bars children, preparing it to be hidden.
        logo.style.opacity = 0;
        home.style.opacity = 0;
        cv.style.opacity = 0;
        login.style.opacity = 0;
        logout.style.opacity = 0;
        profileIcon.style.opacity = 0;
        login.style.cursor = "";
        logout.style.cursor = "";
        navbar.style.height = "50%";
        arrow.style.opacity = 1;
        //Hide all the buttons.
        setTimeout(() => {
            buttons.forEach(link => link.style.display = "none");
        }, 200);
    }, 500);
}

//Assign the DOM ready method.
document.addEventListener("DOMContentLoaded", start, false);
