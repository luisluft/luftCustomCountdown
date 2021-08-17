const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const datePickerElement = document.getElementById("date-picker");
const countdownElement = document.getElementById("countdown");
const countdownTitleElement = document.getElementById("countdown-title");
const countdownButtonElement = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;

const today = new Date().toISOString().split("T")[0];
datePickerElement.setAttribute("min", today);

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

function populateUI() {
  const now = new Date().addHours(-4).getTime();
  const distance = countdownValue - now;
  const days = Math.floor(distance / day);
  const hours = Math.floor((distance % day) / hour);
  const minutes = Math.floor((distance % hour) / minute);
  const seconds = Math.floor((distance % minute) / second);

  countdownTitleElement.textContent = `${countdownTitle}`;
  timeElements[0].textContent = `${days}`;
  timeElements[1].textContent = `${hours}`;
  timeElements[2].textContent = `${minutes}`;
  timeElements[3].textContent = `${seconds}`;

  inputContainer.hidden = true;
  countdownElement.hidden = false;
}

function updateCountdown(event) {
  event.preventDefault();
  // Get values from form input
  countdownTitle = event.target[0].value;
  countdownDate = event.target[1].value;
  // Get number version of current date, updateDOM
  countdownValue = new Date(countdownDate).getTime();
  populateUI();
}

countdownForm.addEventListener("submit", updateCountdown);
