//Disc variables.
var activate_disc = false;
var playing_disc = false;
var animating_disc = false;

//Variable which determines whether the hover video controls can be seen.
var showing_controls = false;

//Variable which determines whether the volume is on or off and is used to distinguish whether to turn it on or off.
var volume_on = true;

//Get the elements on the wallpaper.
const wallpaper = document.getElementById("wallpaper");
const cover = document.getElementById("video-cover");
const disc = document.getElementById("disc");

const play_button = document.getElementById("play");
const restart_button = document.getElementById("restart");
const rewind_button = document.getElementById("rewind");
const skip_button = document.getElementById("skip");
const end_button = document.getElementById("end");

const play_icon = document.getElementById("playicon");
const pause_icon = document.getElementById("pause-icon");

const volume_on_icon = document.getElementById("volumeon");
const volume_off_icon = document.getElementById("volume-off");

const video = document.querySelector("video");

const video_container = document.getElementById("video-container");
const volume_button = document.getElementById("volume");
const video_slider = document.getElementById("video-slider");

//The starting method.
function start() {
    //Set it up so clicking the disc will start the video and the video ending will eject the disc.
    disc.addEventListener("click", insertDisc);
    video.addEventListener("ended", ejectDisc);

    //When the slider value is changed we want to set the video time to the slider value.
    video_slider.addEventListener("input", setVideoTime, false);
    //Every time the current playing position of the video updates we'll set the slider accordingly.
    video.addEventListener("timeupdate", setSliderPosition, false);
    //The volume button checks if the volume is on and calls the correct method.
    volume_button.addEventListener("click", setVolume);
    //The play button will either start the video or continue playing it.
    play_button.addEventListener("click", playClicked);

    //These buttons do what they say on the tin.
    restart_button.addEventListener("click", resetVideo);
    rewind_button.addEventListener("click", rewindVideo)
    skip_button.addEventListener("click", skipVideo)
    end_button.addEventListener("click", ejectDisc);

    //We want to distinguish whether we should use pc or mobile interaction.
    //Pc interaction occurs on hover where as mobile interaction occurs on press.
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        video_container.addEventListener('click', mobileControlsHandler);
    }
    else {
        video_container.addEventListener("mouseover", showControls);
        video_container.addEventListener("mouseleave", hideControls);
    }
}

//For mobiles, as we don't have the ability to hover over, we'll accept clicking on the video to show and hide the controls.
function mobileControlsHandler() {
    if (!showing_controls){
        showControls();
    }
    else {
        hideControls();
    }
}

//Showing the hover controls.
function showControls() {
    video_slider.style.opacity = 1;
    volume_button.style.opacity = 1;
    showing_controls = true;
}

//Hiding the hover controls.
function hideControls() {
    video_slider.style.opacity = 0;
    volume_button.style.opacity = 0;
    showing_controls = false;
}

//Setting the video time.
function setVideoTime() {
    //The current time in the video is set as the slider value over the max slider value multiplied by the total length of the video.
    video.currentTime = video_slider.value / video_slider.max * video.duration;
}

//Setting the slider position.
function setSliderPosition() {
    //The slide is set as the current time in the video over the total length of the video multiplied by the max slider value.
    video_slider.value = video.currentTime / video.duration * video_slider.max;
}

//Setting the video volume.
function setVolume() {
    if (volume_on){
        turnVolumeOff();
    }
    else {
        turnVolumeOn();
    }
}

//Clicking the play button.
function playClicked() {
    //For play if the disc isn't in, we want to insert it.
    if (!activate_disc) {
        window.scrollTo(0, 0);
        insertDisc();
    }
    else {
        //Then we want to check either pause or play the video.
        if (!playing_disc){
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
    if (!activate_disc){
        //If the disc is already animating we return and do nothing.
        if (animating_disc) return;
        animating_disc = true;
        activate_disc = true;
        disc.style.animation = "play-disc 1s linear";
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
    if (activate_disc){
        if (animating_disc) return;
        animating_disc = true;
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
            activate_disc = false;
        }, 1000);
    }
}

//Play the video.
function playVideo() {
    if (!activate_disc) return;
    playTvAnimations();
    playing_disc = true;
    video.play();
}

//Pause the video.
function pauseVideo() {
    if (!activate_disc) return;
    pauseTvAnimations();
    playing_disc = false;
    video.pause();
}

//Reset the video back to zero.
function resetVideo() {
    if (!activate_disc) return;
    video.currentTime = 0;
}

//Rewind the video 5 milliseconds.
function rewindVideo() {
    if (!activate_disc) return;
    video.currentTime -= 5;
}

//Skip 5 milliseconds in the video.
function skipVideo() {
    if (!activate_disc) return;
    video.currentTime += 5;
}

//Turn the volume on.
function turnVolumeOn() {
    video.volume = 1;
    hideElement(volume_off_icon);
    showElement(volume_on_icon);
    volume_on = true;
}

//Turn the volume off.
function turnVolumeOff() {
    video.volume = 0;
    hideElement(volume_on_icon);
    showElement(volume_off_icon);
    volume_on = false;
}

//Play the disc insertion and playing animations.
function playDiscAnimation() {
    disc.style.animation = "spin-disc 300ms infinite linear";
    wallpaper.style.backgroundColor = "black";
    animating_disc = false;
}

//Play the disc ejection animation.
function ejectDiscAnimation() {
    disc.style.animation = "play-disc 1s reverse";
    disc.style.animationPlayState = "running";
    wallpaper.style.backgroundColor = "";
    animating_disc = false;
}

//Play the tv animation.
function playTvAnimations() {
    disc.style.animationPlayState = "running";
    hideElement(play_icon);
    showElement(pause_icon);
}

//Pause the tv animations.
function pauseTvAnimations() {
    disc.style.animationPlayState = "paused";
    hideElement(pause_icon);
    showElement(play_icon);
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
