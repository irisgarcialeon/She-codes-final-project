//Feature 1//
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  return `${currentDay}, ${currentMonth} ${currentDate}, ${currentHour}:${currentMinute}`;
}

let dateTime = document.querySelector("#current-time");
let currentTime = new Date();
dateTime.innerHTML = formatDate(currentTime);

//Feature 2//
function changeCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-input");
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = citySearch.value;
}
let searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", changeCity);

//Search Engine//
function showWeather(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#current-degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity-value").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;
}

function showCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-input");
  let city = searchCity.value;
  console.log(city);
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7d88c15d68c158185437db8adc9adf90&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

let searchEngine = document.querySelector("#search-form");
searchEngine.addEventListener("submit", showCity);

// Button geo-location //

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7d88c15d68c158185437db8adc9adf90&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let geoButton = document.querySelector("#geolocation");
geoButton.addEventListener("click", getCurrentPosition);
