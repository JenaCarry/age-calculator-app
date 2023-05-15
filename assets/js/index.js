window.addEventListener("load", () => {
  const input = document.querySelectorAll("input");
  const day = document.querySelector("#day");
  const month = document.querySelector("#month");
  const year = document.querySelector("#year");
  const btn = document.querySelector("#btn");
  const resultDay = document.querySelector(".result-day");
  const resultMonth = document.querySelector(".result-month");
  const resultYear = document.querySelector(".result-year");

  const currentDay = new Date().getDate();
  const currentYear = new Date().getFullYear();

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    checkInputs();
  });

  input.forEach((element) => {
    element.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        btn.click();
      }
    });
  });

  function checkInputs() {
    checkEmpty(day);
    checkEmpty(month);
    checkEmpty(year);

    isValidDay(day, month, leapYear(currentYear));
    isValidMonth(month);
    isValidYear(year, currentYear);

    const objData = checkAll(day.value, month.value, year.value);
    checkResult(day, resultDay, objData.totalDay);
    checkResult(month, resultMonth, objData.totalMonth);
    checkResult(year, resultYear, objData.totalYear);
  }
});

function checkEmpty(input) {
  if (input.value === "") {
    setErrorFor(input, "This field is required");
  } else {
    setSuccessFor(input);
  }
}

function isValidDay(input, month, bool) {
  const dayNumber = Number(input.value);
  const monthNumber = Number(month.value);
  if (dayNumber < 0 || dayNumber > 31) {
    setErrorFor(input, "Must be a valid day");
  }
  if (
    dayNumber === 31 &&
    (monthNumber === 4 ||
      monthNumber === 6 ||
      monthNumber === 9 ||
      monthNumber === 11)
  ) {
    setErrorFor(input, "Must be a valid day");
  }
  if (dayNumber > 29 && monthNumber === 2) {
    setErrorFor(input, "Must be a valid day");
  } else if (dayNumber === 29 && monthNumber === 2 && bool === false) {
    setErrorFor(input, "Must be a valid day");
  }
}

function isValidMonth(input) {
  const monthNumber = Number(input.value);
  if (monthNumber < 0 || monthNumber > 12) {
    setErrorFor(input, "Must be a valid month");
  }
}

function isValidYear(input, currentYear) {
  const yearNumber = Number(input.value);
  if (yearNumber < 0 || yearNumber > currentYear) {
    setErrorFor(input, "Must be a valid year");
  }
}

function setErrorFor(input, msg) {
  const formControl = input.parentNode;
  const formControlDiv = formControl.parentNode;
  const error = formControlDiv.querySelector(".error");
  error.innerText = msg;
  formControlDiv.classList.add("invalid");
}

function setSuccessFor(input) {
  const formControl = input.parentNode;
  const formControlDiv = formControl.parentNode;
  formControlDiv.classList.remove("invalid");
}

function leapYear(currentYear) {
  if (
    currentYear % 4 === 0 && currentYear % 100 !== 0 ||
    currentYear % 400 === 0
  ) {
    return true;
  }
  return false;
}

function checkResult(input, result, obj) {
  const formControl = input.parentNode;
  const formControlDiv = formControl.parentNode;
  if (formControlDiv.classList.contains("invalid")) {
    result.innerHTML = "--";
  } else {
    result.innerHTML = obj;
  }
}

function checkAll(day, month, year) {
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  let totalYear = currentYear - year;
  let totalMonth = currentMonth + 1 - month;
  let totalDay = currentDay - day;

  if (totalMonth < 0 || (totalMonth === 0 && totalDay < 0)) {
    totalYear--;
    totalMonth += 12;
  }

  if (totalDay < 0) {
    let ultimoDiaMesAnterior = new Date(currentYear, currentMonth, 0).getDate();
    totalDay += ultimoDiaMesAnterior;
    totalMonth--;
  }
  return {
    totalYear: totalYear,
    totalMonth: totalMonth,
    totalDay: totalDay,
  };
}
