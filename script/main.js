//Get the elements needed.
let navbar = document.querySelector("nav");
let logo = document.querySelector("#logo");
let home = document.querySelector("#homebutton");
let cv = document.querySelector("#cvbutton");
let login = document.querySelector("#loginmenubutton");
let logout = document.querySelector("#logoutmenubutton");
let profileicon = document.querySelector("#profileicon");
let arrow = document.querySelector("#arrow");

//Get all header buttons for mobile usage.
let buttons = document.querySelectorAll("header a");

//We need a variable to determine whether it is shown or not to prevent it being shown twice on mobiles.
//And also some children have delayed animations which would need to be cancelled.
let navbarShown = false;

//For PCs the navbar will show when hovering over.
navbar.addEventListener('mouseover', function() {
    if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
        showNav();
    }
},false);

navbar.addEventListener('mouseleave', function() {
    if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
        hideNav();
    }
},false);

//For mobiles, the buttons will activate even when hidden so we need to hide them until we need them.
window.onload = function() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        buttons.forEach(link => link.style.display = "none");
    }
}

//For mobiles, as we don't have the ability to hover over, we'll accept a click of the navbar to show it.
navbar.onclick = function() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (navbarShown) {
            buttons.forEach(link => link.style.display = "none");
            hideNav();
        }
        else {
            buttons.forEach(link => link.style.display = "");
            showNav();
        }
    }
}

//Showing the navbar.
function showNav() {
    //If the bars already showing return and do nothing.
    if (navbarShown) return;
    navbarShown = true;
    //Set the attributes of the bars children, preparing it to be shown.
    navbar.style.height = "100%";
    arrow.style.opacity = 0;
    logo.style.opacity = 1;
    //Delay the home button and cv button being shown.
    setTimeout(() => {
        //If the navbar has been hidden during the timeout period then return and do nothing as the showing has been cancelled.
        if (!navbarShown) return;
        home.style.opacity = 1;
    }, 200);
    setTimeout(() => {
        if (!navbarShown) return;
        cv.style.opacity = 1;
    }, 400);
    if (sessionStorage.getItem("loggedin") != null){
        setTimeout(() => {
            if (!navbarShown) return;
            logout.style.opacity = 1;
            profileicon.style.opacity = 1;
            logout.style.cursor = "pointer";
        }, 600);
    }
    else {
        setTimeout(() => {
            if (!navbarShown) return;
            login.style.opacity = 1;
            login.style.cursor = "pointer";
        }, 600);
    }
}

//Hiding the navbar.
function hideNav() {
    //If the bars already hidden return and do nothing.
    if (!navbarShown) return;
    navbarShown = false;
    //Set the attributes of the bars children, preparing it to be hidden.
    logo.style.opacity = 0;
    home.style.opacity = 0;
    cv.style.opacity = 0;
    login.style.opacity = 0;
    logout.style.opacity = 0;
    profileicon.style.opacity = 0;
    login.style.cursor = "";
    logout.style.cursor = "";
    //Delay the navbar shrinking as the buttons won't shrink with it and then along with that show the dropdown arrow.
    setTimeout(() => {
        if (navbarShown) return;
        navbar.style.height = "50%";
        arrow.style.opacity = 1;
    }, 200);
}