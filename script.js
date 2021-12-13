const form = document.getElementById("countdownForm");
const inputContainer = document.getElementById("input-container");
const titleInput = document.getElementById("title");
const dateEl = document.getElementById("date-picker");

const today = new Date().toISOString().split("T")[0];

dateEl.setAttribute("min", today);
const formSubmit = (e) => {
  e.preventDefault();
};
form.addEventListener("submit", formSubmit);
