
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const themeToggle = document.getElementById("themeToggle");

let currentInput = "0";

function updateDisplay() {
  display.value = currentInput;
}

function appendValue(value) {
  if (currentInput === "0" && value !== ".") {
    currentInput = value;
  } else {
    currentInput += value;
  }
  updateDisplay();
}

function clearDisplay() {
  currentInput = "0";
  updateDisplay();
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  if (currentInput === "") currentInput = "0";
  updateDisplay();
}

function calculateResult() {
  try {
    const expression = currentInput.replace(/%/g, "/100");
    const result = eval(expression);

    if (result === undefined || Number.isNaN(result)) {
      currentInput = "Error";
    } else {
      currentInput = Number.isInteger(result)
        ? result.toString()
        : result.toFixed(4).replace(/\.?0+$/, "");
    }
  } catch (error) {
    currentInput = "Error";
  }
  updateDisplay();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (action === "clear") {
      clearDisplay();
    } else if (action === "delete") {
      deleteLast();
    } else if (action === "calculate") {
      calculateResult();
    } else if (value) {
      if (currentInput === "Error") currentInput = "0";
      appendValue(value);
    }
  });
});

document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || ["+", "-", "*", "/", ".", "%"].includes(key)) {
    if (currentInput === "Error") currentInput = "0";
    appendValue(key);
  } else if (key === "Enter" || key === "=") {
    e.preventDefault();
    calculateResult();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "🌙" : "☀️";
});

updateDisplay();
