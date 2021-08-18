const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const datePickerElement = document.getElementById("date-picker");
const countdownElement = document.getElementById("countdown");
const countdownTitleElement = document.getElementById("countdown-title");
const countdownButtonElement = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");
const completeElement = document.getElementById("complete");
const completeInfoElement = document.getElementById("complete-info");
const completeButtonElement = document.getElementById("complete-button");

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;

const today = new Date().toISOString().split("T")[0];
datePickerElement.setAttribute("min", today);

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

function populateUI() {
  countdownActive = setInterval(() => {
    const now = new Date().addHours(-4).getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    inputContainer.hidden = true;

    if (distance < 0) {
      countdownElement.hidden = true;
      clearInterval(countdownActive);
      completeInfoElement.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeElement.hidden = false;
    } else {
      countdownTitleElement.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeElement.hidden = true;
      countdownElement.hidden = false;
    }
  }, second);
}

function resetCountdown() {
  countdownElement.hidden = true;
  completeElement.hidden = true;
  inputContainer.hidden = false;

  clearInterval(countdownActive);

  countdownTitle = "";
  countdownDate = "";
}

function updateCountdown(event) {
  event.preventDefault();
  // Get values from form input
  countdownTitle = event.target[0].value;
  countdownDate = event.target[1].value;

  if (countdownDate === "") {
    alert("Please select a valid date");
  } else {
    // Get number version of current date, updateDOM
    countdownValue = new Date(countdownDate).getTime();
    populateUI();
  }
}

countdownForm.addEventListener("submit", updateCountdown);
countdownButtonElement.addEventListener("click", resetCountdown);
completeButtonElement.addEventListener("click", resetCountdown);
