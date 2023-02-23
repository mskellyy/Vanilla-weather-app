// Code for changing date and time

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDate = document.querySelector(".dayDate");
currentDate.innerHTML = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentMonth = document.querySelector(".month");
currentMonth.innerHTML = months[now.getMonth()];

let currentDay = document.querySelector("#date");
currentDay.innerHTML = now.getDate();

let currentYear = document.querySelector(".year");
currentYear.innerHTML = now.getFullYear();

let currentTime = document.querySelector(".time");
currentTime.innerHTML = now.toLocaleTimeString();
