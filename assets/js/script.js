let body = document.querySelector("body");
let btnStart = document.querySelector(".button-start");
let btnPause = document.querySelector(".button-pause");
let btnContinue = document.querySelector(".button-continue");
let btnRestart = document.querySelector(".button-restart");
let display = document.querySelector(".display");
let btnMenu = document.querySelector(".button-menu");
let btnSound = document.querySelector(".button-sound");
let menu = document.querySelector(".menu");
let btnSave = document.querySelector(".button-save");
let audio = document.querySelector('audio');

let pomodoroTime = 0;
let shortBreak = 0;
let longBreak = 0;

let minutes = 0;
let seconds = 0;

let started = false;
let isPomodoro = false;
let counterBreaks = 0;
let counter = 0;

function setTimes(){
    pomodoroTime = document.getElementById("pomodoroTime").value;
    shortBreak = document.getElementById("shortBreakTime").value;
    longBreak = document.getElementById("longBreakTime").value;
}

function preparePomodoro(){
    minutes = pomodoroTime;
    seconds = 0;
    body.removeAttribute("class");
    body.classList.add("pomodoro");
    isPomodoro = true;
}

function prepareShortBreak(){
    minutes = shortBreak;
    body.removeAttribute("class");
    body.classList.add("short-break");
    isPomodoro = false;
}

function prepareLongBreak(){
    minutes = longBreak;
    body.removeAttribute("class");
    body.classList.add("long-break");
    isPomodoro = false;
}

function counting(){
    counter = setInterval(() => {

        if(seconds > 0){
            seconds--;
        }else{
            if(minutes > 0){
                minutes--;
                seconds = 59;
            }else{
                pause();
                playAudio();

                btnPause.classList.add("d-none");
                btnStart.classList.remove("d-none");
                if(!isPomodoro){
                    preparePomodoro();
                }else if(isPomodoro && counterBreaks < 3){
                    counterBreaks++;
                    prepareShortBreak();
                }else{
                    counterBreaks = 0;
                    prepareLongBreak();
                }
            }
        }

        updateDisplay();
    }, 10);
}

function updateDisplay(){
    let m = `0${minutes}`;
    let s = `0${seconds}`;

    display.innerText = `${m.slice(-2)}:${s.slice(-2)}`;
}

function pause(){
    clearInterval(counter);
    started = false;
}

function pauseAudio(){
    audio.pause();
    btnSound.classList.add("d-none");
}

function playAudio(){
    audio.play();
    btnSound.classList.remove("d-none");
}

function toggleButtonsOnStartClick(){
    btnStart.classList.add("d-none");
    btnContinue.classList.add("d-none");
    btnPause.classList.remove("d-none");
    btnRestart.classList.remove("d-none");
}
function toggleButtonsOnPauseClick(){
    btnStart.classList.add("d-none");
    btnContinue.classList.remove("d-none");
    btnPause.classList.add("d-none");
    btnRestart.classList.remove("d-none");
}
function toggleButtonsOnContinueClick(){
    btnStart.classList.add("d-none");
    btnContinue.classList.add("d-none");
    btnPause.classList.remove("d-none");
    btnRestart.classList.remove("d-none");
}
function toggleButtonsOnRestartClick(){
    btnStart.classList.remove("d-none");
    btnContinue.classList.add("d-none");
    btnPause.classList.add("d-none");
    btnRestart.classList.add("d-none");
}

btnStart.onclick = () => {
    if(!started){
        started = true;
        counting();
    }

    toggleButtonsOnStartClick();
}

btnPause.onclick = () => {
    toggleButtonsOnPauseClick();
    pause();
}

btnContinue.onclick = () => {
    if(!started){
        started = true;
        counting();
    }
    toggleButtonsOnContinueClick();
}

btnRestart.onclick = () => {
    reset();
}

function reset(){
    toggleButtonsOnRestartClick();

    pause();
    preparePomodoro();
    counterBreaks = 0;
    updateDisplay();
}

btnSave.onclick = () => {
    setTimes();
    reset();
}

btnMenu.onclick = () => {
    btnMenu.classList.toggle("show-menu");
    btnSound.classList.toggle("show-menu");
    menu.classList.toggle("show-menu");
}

setTimes();
preparePomodoro();
updateDisplay();