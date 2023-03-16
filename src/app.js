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
  let apiKey = "f3009e4852fa0a079dab291dabf020c4";
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

// WEEK FORECAST CODE
function displayForecast() {
  let weekForecast = document.querySelector("#week-forecast");
  let forecastHTML = "";
  forecastHTML = `      <div class="card" style="width: 13rem">
            <div class="card-body">
        <h2 class="card-title">Sunday</h2>
              <img src="img/clear.png" width="100" class="weekday-emoji">
        <p class="card-text"><span class="forecast-max">28</span>° |
          <span class="forecast-min">16</span>°</p>
        <p class="forecast">Sunny</p>
        </div>`;
  weekForecast.innerHTML = forecastHTML;
}

// code for searching temp API

function showSearchTemp(response) {
  console.log(response.data);
  let pageTemp = document.querySelector(".today-temp");
  let currentCity = document.querySelector(".city");
  let description = document.querySelector(".today-conditions");
  let todayHumidity = document.querySelector("#today-humidity");
  let todayWind = document.querySelector("#today-wind");
  let todayDate = document.querySelector("#search-date");
  let iconElement = document.querySelector("#icon");

  celTemp = Math.round(response.data.main.temp);
  pageTemp.innerHTML = `${celTemp}`;
  currentCity.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  todayHumidity.innerHTML = response.data.main.humidity;
  todayWind.innerHTML = Math.round(response.data.wind.speed);
  todayDate.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  displayForecast();
}

function getCity(city) {
  let apiKey = "f3009e4852fa0a079dab291dabf020c4";
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
  celLink.classList.add("notActive");
  fahLink.classList.remove("notActive");
  let tempElement = document.querySelector(".today-temp");
  let fahTemp = (celTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahTemp);
}

function displayCelTemp(event) {
  event.preventDefault();
  celLink.classList.remove("notActive");
  fahLink.classList.add("notActive");
  let tempElement = document.querySelector(".today-temp");
  tempElement.innerHTML = Math.round(celTemp);
}

let celTemp = null;

let fahLink = document.querySelector("#fah-link");
fahLink.addEventListener("click", displayFahTemp);

let celLink = document.querySelector("#cel-link");
celLink.addEventListener("click", displayCelTemp);

getCity("Paris");
