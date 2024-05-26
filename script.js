let timer;
let isRunning = false;
let startTime, pausedTime, elapsedTime = 0;
let lapCount = 1;

function startStop() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
        document.getElementById("startStopBtn").textContent = "Pause";
    } else {
        clearInterval(timer);
        pausedTime = Date.now();
        document.getElementById("startStopBtn").textContent = "Resume";
    }
    isRunning = !isRunning;
}

function lap() {
    if (isRunning) {
        let lapTime = Date.now() - startTime;
        displayLap(lapTime);
    }
}

function reset() {
    clearInterval(timer);
    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("laps").innerHTML = "";
    elapsedTime = 0;
    isRunning = false;
    document.getElementById("startStopBtn").textContent = "Start";
    lapCount = 1;
    document.getElementById("fill").style.transform = "rotate(0deg)";
}

function updateTime() {
    let currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    displayTime(elapsedTime);

    let progress = (elapsedTime / 60000) * 360; // 1 minute = 360 degrees
    document.getElementById("fill").style.transform = `rotate(${progress}deg)`;
}

function displayTime(time) {
    let milliseconds = Math.floor((time % 1000) / 10);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor(time / (1000 * 60 * 60));

    document.getElementById("display").textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
}

function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

function displayLap(time) {
    let lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCount++}: ${formatTime(Math.floor(time / 60000))}:${formatTime(Math.floor((time % 60000) / 1000))}.${formatTime(Math.floor((time % 1000) / 10))}`;
    document.getElementById("laps").appendChild(lapItem);
}

document.getElementById("startStopBtn").addEventListener("click", startStop);
document.getElementById("lapBtn").addEventListener("click", lap);
document.getElementById("resetBtn").addEventListener("click", reset);
