// API Variables
var cityBikeApiUrl = "http://api.citybik.es/v2/networks";
var searchBtnEl = document.querySelector(".search-btn");
var containerEl = document.querySelector(".container");
var searchEl = document.querySelector(".search-input");
var BikeContainer = document.querySelector(".bike-api-container");

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

    saveCitySearch(city);
    weather(city);
    cityBike(city);
    // map(city)
    searchEl.value = "";
  }
});



// WEATHER API FETCH FUNCTION
function weather(searchedCity) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchedCity +
      "&appid=a411ef0030322e0862cd44cde300dd84&units=imperial"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(searchedCity);
      // weather api print to page
      // temperature
      document.querySelector(".temp").textContent =
        Math.round(data.main.temp) + "°F";
      console.log(Math.round(data.main.temp));

      // weather description
      document.querySelector(".description").textContent =
        data.weather[0].description;
      console.log(data.weather[0].description);

      // can pull other icons from another source if you want
      // weather icons
      var weatherIcon = data.weather[0].icon;
      var weatherIconUrl =
        "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
      document.querySelector(".icon").setAttribute("src", weatherIconUrl);
      console.log(weatherIconUrl);

      // sunrise
      var sunrise = data.sys.sunrise;
      var sunriseActual = new Date(sunrise * 1000);
      var sunriseTime = dayjs(sunriseActual).format("h:mm A");
      document.querySelector(".sunrise").textContent =
        "Sunrise: " + sunriseTime;
      console.log(sunriseTime);

      // sunset
      var sunset = data.sys.sunset;
      var sunsetActual = new Date(sunset * 1000);
      var sunsetTime = dayjs(sunsetActual).format("h:mm A");
      document.querySelector(".sunset").textContent = "Sunset: " + sunsetTime;
      console.log(sunsetTime);
    });
}



// CITYBIKE API FETCH FUNCTION
function cityBike(city) {
  console.log(city);
  fetch("http://api.citybik.es/v2/networks/" + city + "")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // for each loop calling each variable
      data.network.stations.slice(0, 5).forEach((station) => {
        console.log(station.extra.address);
        let stationName = station.name; //station name
        let stationAddress = station.extra.address; //station address
        let freeBikes = station.free_bikes; //available bikes
        let emptySlots = station.empty_slots; //empty slots

        // template literal placing the data on the page - edit this in css
        function bikeInformation() {
          var bikeHtml = document.createElement("div");
          bikeHtml.innerHTML = `<div class = "bike-container"> 
             <h3>Station Name: <p> ${stationName} </p> </h3>
             <h3>Station Address: <p> ${stationAddress} </p></h3>
             <h3># of Available Bikes: <p> ${freeBikes} </p></h3>
             <h3># of Empty Slots: <p> ${emptySlots} </p></h3>
            <br>
          </div>`;
          BikeContainer.appendChild(bikeHtml);
          console.log(bikeHtml);
        }
        BikeContainer.innerhtml = bikeInformation();
      });
    });
}

// WORKING ON A MAP FUNCTION

// function map(){
//   // var long = data.stations.coord.lat;
//   // var lat = data.stations.coord.lon;
//   // var latlng = L.latLng(50.5, 30.5);
// var map = L.map('map').setView([51.505, -0.09], 13);
// console.log(map)

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup('searched city name')
//     .openPopup();
// }



// Saving the past searches into local storage



function saveCitySearch(city) {
  let previousHistory = JSON.parse(localStorage.getItem("searchHistory")) || {};
  previousHistory[city] = true;
  localStorage.setItem("searchHistory", JSON.stringify(previousHistory));
}
