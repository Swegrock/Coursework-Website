let activateDisc = false;
let playingDisc = false;
let animatingDisc = false;

let volumeOn = true;

//Get the elements on the page.
let page = document.querySelector("#page");
let cover = document.querySelector("#videocover");
let disc = document.querySelector("#disc");

let playIcon = document.querySelector("#playicon");
let pauseIcon = document.querySelector("#pauseicon");

let volumeOnIcon = document.querySelector("#volumeon");
let volumeOffIcon = document.querySelector("#volumeoff");

let videoContainer = document.querySelector("#videocontainer");
let video = document.querySelector("video");
let volumeButton = document.querySelector("#volume");
let videoSlider = document.querySelector("#videoslider");

//Set it up so clicking the disc will start the video and the video ending will "eject" the disc.
disc.onclick = function() {insertDisc();}
video.onended = function() {ejectDisc();}

//Attach each element to their equivalent function.
document.querySelector("#restart").onclick = function() {resetVideo();}
document.querySelector("#rewind").onclick = function() {rewindVideo();}
document.querySelector("#skip").onclick = function() {skipVideo();}
document.querySelector("#end").onclick = function() {ejectDisc();}

//For play if the disc isn't in, we want to insert it.
document.querySelector("#play").onclick = function() {
    if (!activateDisc) {
        window.scrollTo(0, 0);
        insertDisc();
    }
    else {
        //Then we want to check either pause or play the video.
        if (!playingDisc){
            playVideo();
        }
        else {
            pauseVideo();
        }
    }
}

//The volume button checks if the volume is on and calls the correct method.
volumeButton.onclick = function() {
    if (volumeOn){
        turnVolumeOff();
    }
    else {
        turnVolumeOn();
    }
}

//Every time the current playing position of the video updates we'll set the slider accordingly.
video.ontimeupdate = function() {
    //The slide is set as the current time in the video over the total length of the video multiplied by the max slider value.
    videoSlider.value = video.currentTime / video.duration * videoSlider.max;
}

//When the mouse is over the video we want to show the video slider and volume button.
videoContainer.addEventListener('mouseover', function() {
    videoSlider.style.opacity = 1;
    volumeButton.style.opacity = 1;
},false);

//When the mouse leaves the video we want to hide the video slider and volume button.
videoContainer.addEventListener('mouseout', function() {
    videoSlider.style.opacity = 0;
    volumeButton.style.opacity = 0;
},false);

//When the slider value is changed we want to set the video time to the slider value.
videoSlider.addEventListener("input", function() {
    //The current time in the video is set as the slider value over the max slider value multiplied by the total length of the video.
    video.currentTime = videoSlider.value / videoSlider.max * video.duration;
}, false);

//Inserting the disc.
function insertDisc() {
    //If the disc is already in eject it.
    if (!activateDisc){
        //If the disc is already animating we return and do nothing.
        if (animatingDisc) return;
        animatingDisc = true;
        activateDisc = true;
        disc.style.animation = "playdisc 1s linear";
        //Wait for the disc to be fully inserted and play the video.
        setTimeout(() => {
            playDiscAnimation();
            scrollToWithOffset(disc, -80);
            hideElement(cover);
            video.style.animation = "flicker 500ms infinite alternate-reverse";
            playVideo();
        }, 1000);
    }
    else {
        ejectDisc();
    }
}

//Ejecting the disc.
function ejectDisc() {
    //If the disc is in we can eject it.
    if (activateDisc){
        if (animatingDisc) return;
        animatingDisc = true;
        //Reset the video back to its original state and eject it.
        pauseVideo();
        resetVideo();
        turnVolumeOn();
        video.style.animation = "";
        showElement(cover);
        ejectDiscAnimation();
        window.scrollTo(0, 0);
        //Replay the disc bouncing animation.
        setTimeout(() => {
            disc.style.animation = "bounce 300ms infinite alternate-reverse";
            activateDisc = false;
        }, 1000);
    }
}

//Play the video.
function playVideo() {
    if (!activateDisc) return;
    playTvAnimations();
    playingDisc = true;
    video.play();
}

//Pause the video.
function pauseVideo() {
    if (!activateDisc) return;
    pauseTvAnimations();
    playingDisc = false;
    video.pause();
}

//Reset the video back to zero.
function resetVideo() {
    if (!activateDisc) return;
    video.currentTime = 0;
}

//Rewind the video 5 milliseconds.
function rewindVideo() {
    if (!activateDisc) return;
    video.currentTime -= 5;
}

//Skip 5 milliseconds in the video.
function skipVideo() {
    if (!activateDisc) return;
    video.currentTime += 5;
}

//Turn the volume on.
function turnVolumeOn() {
    video.volume = 1;
    hideElement(volumeOffIcon);
    showElement(volumeOnIcon);
    volumeOn = true;
}

//Turn the volume off.
function turnVolumeOff() {
    video.volume = 0;
    hideElement(volumeOnIcon);
    showElement(volumeOffIcon);
    volumeOn = false;
}

//Play the disc insertion and playing animations.
function playDiscAnimation() {
    disc.style.animation = "spindisc 300ms infinite linear";
    page.style.backgroundColor = "#333030";
    animatingDisc = false;
}

//Play the disc ejection animation.
function ejectDiscAnimation() {
    disc.style.animation = "playdisc 1s reverse";
    disc.style.animationPlayState = "running";
    page.style.backgroundColor = "#b8c9dd";
    animatingDisc = false;
}

//Play the tv animation.
function playTvAnimations() {
    disc.style.animationPlayState = "running";
    hideElement(playIcon);
    showElement(pauseIcon);
}

//Pause the tv animations.
function pauseTvAnimations() {
    disc.style.animationPlayState = "paused";
    hideElement(pauseIcon);
    showElement(playIcon);
}

//Show an element by setting its display to block.
function showElement(element) {
    element.style.display = "block";
}

//Hide an element by setting its display to none.
function hideElement(element) {
    element.style.display = "none";
}

//Scroll towards an element with a Y offset.
function scrollToWithOffset(element, yOffset = 0){
    var scrollY = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo(0, scrollY);
}