//Disc variables.
var activateDisc = false;
var playingDisc = false;
var animatingDisc = false;

//Variable which determines whether the hover video controls can be seen.
var showingControls = false;

//Variable which determines whether the volume is on or off and is used to distinguish whether to turn it on or off.
var volumeOn = true;

//Get the elements on the page.
const page = document.querySelector("#page");
const cover = document.querySelector("#videocover");
const disc = document.querySelector("#disc");

const playButton = document.querySelector("#play");
const restartButton = document.querySelector("#restart");
const rewindButton = document.querySelector("#rewind");
const skipButton = document.querySelector("#skip");
const endButton = document.querySelector("#end");

const playIcon = document.querySelector("#playicon");
const pauseIcon = document.querySelector("#pauseicon");

const volumeOnIcon = document.querySelector("#volumeon");
const volumeOffIcon = document.querySelector("#volumeoff");

const video = document.querySelector("video");

const videoContainer = document.querySelector("#videocontainer");
const volumeButton = document.querySelector("#volume");
const videoSlider = document.querySelector("#videoslider");

//The starting method.
function start() {
    //Set it up so clicking the disc will start the video and the video ending will eject the disc.
    disc.addEventListener("click", insertDisc);
    video.addEventListener("ended", ejectDisc);

    //When the slider value is changed we want to set the video time to the slider value.
    videoSlider.addEventListener("input", setVideoTime, false);
    //Every time the current playing position of the video updates we'll set the slider accordingly.
    video.addEventListener("timeupdate", setSliderPosition, false);
    //The volume button checks if the volume is on and calls the correct method.
    volumeButton.addEventListener("click", setVolume);
    //The play button will either start the video or continue playing it.
    playButton.addEventListener("click", playClicked);

    //These buttons do what they say on the tin.
    restartButton.addEventListener("click", resetVideo);
    rewindButton.addEventListener("click", rewindVideo)
    skipButton.addEventListener("click", skipVideo)
    endButton.addEventListener("click", ejectDisc);

    //We want to distinguish whether we should use pc or mobile interaction.
    //Pc interaction occurs on hover where as mobile interaction occurs on press.
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        videoContainer.addEventListener('click', mobileControlsHandler);
    }
    else {
        videoContainer.addEventListener("mouseover", showControls);
        videoContainer.addEventListener("mouseleave", hideControls);
    }
}

//For mobiles, as we don't have the ability to hover over, we'll accept clicking on the video to show and hide the controls.
function mobileControlsHandler() {
    if (!showingControls){
        showControls();
    }
    else {
        hideControls();
    }
}

//Showing the hover controls.
function showControls() {
    videoSlider.style.opacity = 1;
    volumeButton.style.opacity = 1;
    showingControls = true;
}

//Hiding the hover controls.
function hideControls() {
    videoSlider.style.opacity = 0;
    volumeButton.style.opacity = 0;
    showingControls = false;
}

//Setting the video time.
function setVideoTime() {
    //The current time in the video is set as the slider value over the max slider value multiplied by the total length of the video.
    video.currentTime = videoSlider.value / videoSlider.max * video.duration;
}

//Setting the slider position.
function setSliderPosition() {
    //The slide is set as the current time in the video over the total length of the video multiplied by the max slider value.
    videoSlider.value = video.currentTime / video.duration * videoSlider.max;
}

//Setting the video volume.
function setVolume() {
    if (volumeOn){
        turnVolumeOff();
    }
    else {
        turnVolumeOn();
    }
}

//Clicking the play button.
function playClicked() {
    //For play if the disc isn't in, we want to insert it.
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
            hideControls();
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
    window.scrollTo(0, element.getBoundingClientRect().top + window.pageYOffset + yOffset);
}

//Assign the DOM ready method.
document.addEventListener("DOMContentLoaded", start, false);
