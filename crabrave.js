const countdownContainer = document.getElementById("countdown-container");
const videoContainer = document.getElementById("video-container");
const timerElement = document.getElementById("timer");
const videoTimerElement = document.getElementById("video-timer");
const videoElement = document.getElementById("crabrave-video");

const videoStartTime = 75000;

var watchingVideo = false;
var timerHidden = false;

function updateTimer() {
    var time = getTimeUntilMidnight();

    if(time < 0) {
        if(watchingVideo && !timerHidden) {
            timerHidden = true;
            videoTimerElement.classList.add("hidden");
        }

        return;
    }

    if(time <= videoStartTime && !watchingVideo) {
        switchToVideo(time);
    }

    var totalSeconds = time / 1000;
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = Math.floor(totalSeconds % 60);
    var formatted = pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2);

    if(watchingVideo) {
        videoTimerElement.innerHTML = formatted;
    } else {
        timerElement.innerHTML = formatted;
    }
}

function pad(num, size) {
    num = num.toString();
    while(num.length < size) num = "0" + num;
    return num;
}

function getTimeUntilMidnight() {
    var midnight = new Date();
    midnight.setHours(24);
    midnight.setMinutes(0);
    midnight.setSeconds(0);
    midnight.setMilliseconds(0);
    return (midnight.getTime() - new Date().getTime());
}

function switchToVideo(time) {
    countdownContainer.classList.add("hidden");
    videoContainer.classList.remove("hidden");
    videoTimerElement.classList.remove("hidden");
    videoElement.play();
    watchingVideo = true;

    var startTime = (videoStartTime - time) / 1000;
    if(startTime > 0) {
        videoElement.currentTime = startTime;
    }
}

function switchToCountdown() {
    countdownContainer.classList.remove("hidden");
    videoContainer.classList.add("hidden");
    videoElement.pause();
    videoElement.currentTime = 0;
    watchingVideo = false;
}

function videoEnded() {
    switchToCountdown();
}

window.addEventListener("load", function() {
    updateTimer();
    setInterval(updateTimer, 50);
});

document.body.addEventListener("click", function() {
    videoElement.muted = false;
    document.getElementById("sound-muted").classList.add("hidden");
});