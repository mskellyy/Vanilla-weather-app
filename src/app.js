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
  let description = document.querySelector(".today-conditions");
  let todayHumidity = document.querySelector("#today-humidity");
  let todayWind = document.querySelector("#today-wind");
  let todayDate = document.querySelector("#search-date");
  let iconElement = document.querySelector("#icon");
  myTemp.innerHTML = `${temperature}`;
  description.innerHTML = response.data.weather[0].description;
  todayHumidity.innerHTML = response.data.main.humidity;
  todayWind.innerHTML = Math.round(response.data.wind.speed);
  todayDate.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

//Code for Weather Search

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours} ${minutes}`;
}

function showSearchTemp(response) {
  console.log(response.data);
  let searchTemp = Math.round(response.data.main.temp);
  let pageTemp = document.querySelector(".today-temp");
  let currentCity = document.querySelector(".city");
  let description = document.querySelector(".today-conditions");
  let todayHumidity = document.querySelector("#today-humidity");
  let todayWind = document.querySelector("#today-wind");
  let todayDate = document.querySelector("#search-date");
  let iconElement = document.querySelector("#icon");

  pageTemp.innerHTML = `${searchTemp}°`;
  currentCity.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  todayHumidity.innerHTML = response.data.main.humidity;
  todayWind.innerHTML = Math.round(response.data.wind.speed);
  todayDate.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function getCity(city) {
  let apiKey = "bae25ad73ded1eaf9b759c8aae273d3f";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showSearchTemp);
}

function handleCity(event) {
  event.preventDefault();
  let searchResult = document.querySelector("#search-bar-input");
  let searchCity = `${searchResult.value}`;
  getCity(searchCity);
}

let form = document.querySelector("#search-bar");
form.addEventListener("submit", handleCity);

// Conversion
function displayFahTemp(event) {
  event.preventDefault();
  alert("Link clicked");
}

let fahLink = document.querySelector("#fah-link");
fahLink.addEventListener("click", displayFahTemp);
