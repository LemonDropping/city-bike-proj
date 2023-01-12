// API Variables
var cityBikeApiUrl = "http://api.citybik.es/v2/networks";
var searchBtnEl = document.querySelector(".search-btn");
var containerEl = document.querySelector(".container");
var searchEl = document.querySelector(".search-input");

// containers display to none upon opening
containerEl.style.display = "none";

// event listener upon clicking search to display containers and fetch API's
searchBtnEl.addEventListener("click", function (event) {
  event.preventDefault();
  containerEl.style.display = "block";

  if (searchEl.value.trim() || searchEl.value.trim() !== "") {
    let city = searchEl.value.trim();
    let cityLower = city.toLowerCase();
    console.log(cityLower);
    // need to add something here for typing an error...catch?

    saveCitySearch(cityLower);
    weather(searchEl.value);
    cityBike(cityLower);
    searchEl.value = "";
  }
});

// WEATHER API FETCH FUNCTION
function weather(localWeather) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    localWeather +
    "&appid=a411ef0030322e0862cd44cde300dd84&units=imperial"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(localWeather);
      document.querySelector(".temp").textContent = Math.round(data.main.temp);
      console.log(Math.round(data.main.temp));

      // weather api print to page
      document.querySelector(".description").textContent =
        data.weather[0].description;
      console.log(data.weather[0].description);

      // can pull other icons from another source if you want
      var weatherIcon = data.weather[0].icon;
      var weatherIconUrl =
        "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
      document.querySelector(".icon").setAttribute("src", weatherIconUrl);
      console.log(weatherIconUrl);

      var sunrise = data.sys.sunrise;
      var sunriseActual = new Date(sunrise * 1000);
      var sunriseTime = dayjs(sunriseActual).format("h:mm A");
      document.querySelector(".sunrise").textContent =
        "Sunrise: " + sunriseTime;
      console.log(sunriseTime);

      var sunset = data.sys.sunset;
      var sunsetActual = new Date(sunset * 1000);
      var sunsetTime = dayjs(sunsetActual).format("h:mm A");
      document.querySelector(".sunset").textContent = "Sunset: " + sunsetTime;
      console.log(sunsetTime);
    });
}

// console.log(searchEl.value);

// CITYBIKE API FETCH FUNCTION
function cityBike(city) {
  console.log(city)
  fetch("http://api.citybik.es/v2/networks/" + city + "")
    .then((response) => response.json())
    .then((data) => {
      // bike data
      console.log(data);

      var stationNetwork = data.network.stations
      var stationName = data.network.stations[0];
      console.log(stationName);
      for (let index = 0; index < stationName.length; index++) {
        console.log(stationName[index]);
      }

    });

  // print Bike Data

  document.querySelector(".stations-name").textContent = "Location: " + stationName;
  console.log(stationName);
  //  var city = data.networks.location.city
  // data.network.station[0].extra.address;
  //console.log(station[0].extra.address);

  //data.network.stations[0]

  // claring the search box
  searchEl.value = "";
}

// Saving the past searches into local storage
function saveCitySearch(city) {
  let previousHistory = JSON.parse(localStorage.getItem("searchHistory")) || {};
  previousHistory[city] = true;
  localStorage.setItem("searchHistory", JSON.stringify(previousHistory));
}
