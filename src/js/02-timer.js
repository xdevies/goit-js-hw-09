import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const daysEl = document.querySelector(`span[data-days]`);
const hoursEl = document.querySelector(`span[data-hours]`);
const minutesEl = document.querySelector(`span[data-minutes]`);
const secondsEl = document.querySelector(`span[data-seconds]`);
const dateTimePicker = document.querySelector(`#datetime-picker`);
const startBtn = document.querySelector(`button[data-start]`);

startBtn.addEventListener(`click`, btnStartClick);
startBtn.disabled = true;

let countdown = 0;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notify.failure("Please choose a date in the future");
    }
    startBtn.disabled = false;
    countdown = selectedDates[0];
  },
};

flatpickr(dateTimePicker, options);

function btnStartClick(e){
  intervalId = setInterval(() =>{
    const now = Date.now();
    const diff = countdown - now;
    
    if (diff <= 0) {
      clearInterval(intervalId);
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }
    
    const timeComponents = convertMs(diff);
    updateTimer(timeComponents);
  }, 1000);
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = days < 10 ? `0${days}` : `${days}`;
  hoursEl.textContent = hours < 10 ? `0${hours}` : `${hours}`;
  minutesEl.textContent = minutes < 10 ? `0${minutes}` : `${minutes}`;
  secondsEl.textContent = seconds < 10 ? `0${seconds}` : `${seconds}`;
}


