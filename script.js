const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const datePickerElement = document.getElementById("date-picker");

const today = new Date().toISOString().split("T")[0];
datePickerElement.setAttribute("min", today);
