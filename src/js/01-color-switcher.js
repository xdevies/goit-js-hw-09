const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let intervalId = null;

function onStartBtnClick() {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopBtnClick() {
  clearInterval(intervalId);

  startBtn.disabled = false;
  stopBtn.disabled = true;
}

startBtn.addEventListener("click", onStartBtnClick);
stopBtn.addEventListener("click",  onStopBtnClick);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }