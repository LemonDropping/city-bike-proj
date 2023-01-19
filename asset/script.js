// API Variables
var cityBikeApiUrl = "http://api.citybik.es/v2/networks";
var searchBtnEl = document.querySelector(".search-btn");
var containerEl = document.querySelector(".container");
var searchEl = document.querySelector(".search-input");
var bikeContainer = document.querySelector(".bike-api-container");
var pastSearchEl = document.getElementById("past-search");

// containers display to none upon opening
containerEl.style.display = "none";
bikeContainer.style.display = "none";

// event listener upon clicking search to display containers and fetch API's
searchBtnEl.addEventListener("click", function (event) {
  event.preventDefault();
  containerEl.style.display = "block";
  bikeContainer.style.display = "block";

  if (searchEl.value.trim() || searchEl.value.trim() !== "") {
    let city = searchEl.value.trim();
    let cityLower = city.toLowerCase();
    console.log(cityLower);

    weather(city);
    cityBike(city);
    saveCitySearch(city);
    //saveCitySearch(data.network.location.city); 
    console.log(event,"data")
    console.warn(city)
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
  fetch("http://api.citybik.es/v2/networks/" + city + "", {mode: "no-cors"})
    .then((response) => response.json())
    .then((data) => {
      console.log(data, "cityBikeData");

      renderHistory();
      bikeContainer.innerHTML = "";

      // for each loop calling each variable
      data.network.stations.slice(0, 5).forEach((station) => {
        console.log(station.extra.address);
        let stationName = station.name; //station name
        let stationAddress = station.extra.address; //station address
        let freeBikes = station.free_bikes; //available bikes
        let emptySlots = station.empty_slots; //empty slots

        // template literal placing the data on the page
        function bikeInformation() {
          var bikeHtml = document.createElement("div");

          var stationNameDiv = document.createElement("div"); // station  name
          stationNameDiv.innerHTML = `<h3>Station Name: <span class="results"> ${stationName} </span></h3>`;
          bikeHtml.appendChild(stationNameDiv);

          var stationAddressDiv = document.createElement("div"); // stationa address
          stationAddressDiv.innerHTML = `<h3>Station Address: <span class="results"> ${stationAddress} </span></h3>`;
          bikeHtml.appendChild(stationAddressDiv);

          var freeBikesDiv = document.createElement("div"); // free bikes
          freeBikesDiv.innerHTML = `<h3># of Available Bikes: <span class="results"> ${freeBikes} </span></h3>`;
          bikeHtml.appendChild(freeBikesDiv);

          var emptySlotsDiv = document.createElement("div"); // empty  slots
          emptySlotsDiv.innerHTML = `<h3># of Empty Slots: <span class="results"> ${emptySlots} </span></h3><br>`;
          bikeHtml.appendChild(emptySlotsDiv);

          bikeContainer.appendChild(bikeHtml);
          console.log(bikeHtml);
        }

        bikeContainer.innerhtml = bikeInformation();
      });
    });
}
-
// Saving the past searches into local storage
function saveCitySearch(city) {
  let previousHistory = JSON.parse(localStorage.getItem("searchHistory")) || {};
  if (!previousHistory[city]) {
    previousHistory[city] = true;
    localStorage.setItem("searchHistory", JSON.stringify(previousHistory));
  }
}

// showing the search history on the page
function renderHistory() {
  let previousHistory = JSON.parse(localStorage.getItem("searchHistory")) || {};
  pastSearchEl.innerHTML = "";
  // creating a button for the previiously searched cities
  for (const cityName in previousHistory) {
    let button = document.createElement("button");
    button.innerText = cityName;
    button.classList.add("search-btn-history");

    // sets up past searches as clickable buttons to recall their weather +  bike  locations
    button.addEventListener("click", function (event) {
      let cityName = event.target.innerText;
      console.log(cityName);
      weather(cityName);
      cityBike(cityName);
    });
    pastSearchEl.append(button);
  }
}
