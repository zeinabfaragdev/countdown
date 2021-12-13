const form = document.getElementById("countdownForm");
const inputContainer = document.getElementById("input-container");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

const today = new Date().toISOString().split("T")[0];

dateEl.setAttribute("min", today);

let countdownTitle = "";
let countDownDate = "";
let countdownValue = Date;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
let countdownActive;

let savedCountDown;

const updateCountdown = (e) => {
  e.preventDefault();

  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  savedCountDown = {
    title: countdownTitle,
    date: countdownDate,
  };

  localStorage.setItem("countdown", JSON.stringify(savedCountDown));

  countdownValue = new Date(countdownDate).getTime();

  updateDom();
};

const updateDom = () => {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    inputContainer.hidden = true;

    if (distance < 0) {
      clearInterval(countdownActive);
      countdownEl.hidden = true;
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      countdownEl.hidden = false;
      completeEl.hidden = true;
    }
  }, second);
};

const reset = () => {
  clearInterval(countdownActive);

  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;

  countdownTitle = "";
  countDownDate = "";

  localStorage.removeItem("countdown");
};

const restorePreviousCountdown = () => {
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountDown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = savedCountDown.title;
    countdownDate = savedCountDown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
  }
};

form.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

restorePreviousCountdown();
