
// Date and time //
function formatDate (timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10){
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10){
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
  return `${day} ${hours}:${minutes}`
}

// Temperature display //
function displayTemperature (response) {
  let temperatureElement = document.querySelector("#temperatures");
  let cityElement = document.querySelector("#city-input");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity-value");
  let windElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#current-time");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt*1000);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

// Search Engine //
function search(city){
let apiKey = "7d88c15d68c158185437db8adc9adf90";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
}

function handleSubmit(event){
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
let celsiusLink = document.querySelector("#celsius-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
celsiusLink.addEventListener("click", displayCelsiusLinkTemperature);
search("Berlin");

// Unit conversion //

function displayFahrenheitTemperature(event){
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperatures");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusLinkTemperature(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperatures");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

