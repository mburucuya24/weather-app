function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} </ br> ${hours}:${minutes}`;
}

let dayElement = document.querySelector("#day");
let now = new Date();

dayElement.innerHTML = formatDate(now);

function showTemp(response) {
  console.log(response);

  let temperature = Math.round(response.data.main.temp);

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
}

function showPosition(position) {
  let apiKey = "fa76215f0cf93568bc4f8d5fad72485f";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemp);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let input = document.querySelector("#request-geolocation");
input.addEventListener("click", getLocation);

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enter-city");

  let cityElement = document.querySelector("#city");
  if (searchInput.value) {
    cityElement.innerHTML = searchInput.value;
  } else {
    cityElement.innerHTML = null;
    alert(`Please enter a city`);
  }

  let apiKey = "fa76215f0cf93568bc4f8d5fad72485f";
  let units = "metric";
  let city = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemp);
}
let form = document.querySelector("#search");

form.addEventListener("submit", searchCity);
