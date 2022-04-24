
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

function formatDay(timestamp){
 let date = new Date(timestamp * 1000);
 let day = date.getDay();
 let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
 return days[day];
}

// Forecast//

function displayForecast(response){
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class = "row">`;
  forecast.forEach(function(forecastDay,index){
    if (index < 6)
   forecastHTML =
     forecastHTML +
     `<div class="col-2">
                <div class="col first-day">${formatDay(forecastDay.dt)}</div>
                 <img
                    src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt=""
                    width="42"
                  />
                <div class="weather-forecast-temperature">
                    <span class="weather-forecast-min">${Math.round(
                      forecastDay.temp.min
                    )}°</span> 
                    | 
                    <span class="weather-forecast-max">${Math.round(
                      forecastDay.temp.max
                    )}°</span>
                </div>
             </div>`;
  }) 
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Temperature display and weather forecast //

function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "7d88c15d68c158185437db8adc9adf90";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature (response) {
  let temperatureElement = document.querySelector("#temperatures");
  let cityElement = document.querySelector("#city");
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

  getForecast(response.data.coord);
}

// Search Engine //
function search(city){
let apiKey = "7d88c15d68c158185437db8adc9adf90";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


// Geolocation button// 

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7d88c15d68c158185437db8adc9adf90&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let geoButton = document.querySelector("#geolocation");
geoButton.addEventListener("click", getCurrentPosition);

search ("Dusseldorf");