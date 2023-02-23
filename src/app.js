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

// Code for Current Location Button

function showWeather(response) {
  let myCity = document.querySelector(".city");
  myCity.innerHTML = `${response.data.name}`;
  let myTemp = document.querySelector(".today-temp");
  let temperature = Math.round(response.data.main.temp);
  myTemp.innerHTML = `${temperature}`;
}

function retrievePosition(position) {
  let apiKey = "bae25ad73ded1eaf9b759c8aae273d3f";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let myLocation = document.querySelector(".location");
myLocation.addEventListener("click", getCurrentLocation);
