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

    // need to add something here for typing an error...catch?

    saveCitySearch(city);
    weather(city);
    cityBike(city);
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
      document.querySelector(".temp").textContent = Math.round(data.main.temp);
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

      // setting stations as an array and slicing it off at 6 return items
      let stationName = [];
      let stationAddress = [];
      let freeBikes = [];
      let emptySlots = [];

      for (
        let index = 0;
        index < data.network.stations.slice(0, 5).length;
        index++
      ) {
        console.log(data.network.stations[index].extra.address);

        // bike api calls = to modify css easier - can change names of each
        stationName.push(data.network.stations[index].name); //station name
        stationAddress.push(data.network.stations[index].extra.address); //station address
        "number of bikes" +
          freeBikes.push(data.network.stations[index].free_bikes); // number of free bikes
        "number of bikes" +
          emptySlots.push(data.network.stations[index].empty_slots); // number of empty slots
      }

      // creating list items for cityBike items
      var ul = document.querySelector(".station-name");
      stationName.forEach((name) => {
        var li = document.createElement("li");
        li.innerText = "location name: " + name; //
        ul.appendChild(li);
      });

      stationAddress.forEach((address) => {
        var li = document.createElement("li");
        li.innerText = "address: " + address; //
        ul.appendChild(li);
      });

      freeBikes.forEach((freeBikes) => {
        var li = document.createElement("li");
        li.innerText = "free bikes: " + freeBikes; //
        ul.appendChild(li);
      });

      emptySlots.forEach((emptySlots) => {
        var li = document.createElement("li");
        li.innerText = "empty slots: " + emptySlots; //
        ul.appendChild(li);
      });
    });
}

// function renderItems(data, city) {
// bikeDisplay(data, city);
// }

// pulling CityBikeAPI key to the page
// function bikeDisplay(data) {
// let stationName = [];
// for (let index = 0; index < data.network.stations.slice(0, 5).length; index++) {
//   // console.log(data.network.stations[index]);
//    stationName.push(data.network.stations[index].name);
//   //  stationName.slice(0, 5)
// console.log(stationName)
// }
// // creating list items
// var ul = document.querySelector(".station-name")
// stationName.forEach((element) => {
//   var li = document.createElement("li");
//   li.innerText = element;
//   ul.appendChild(li);
// });}

// not reading correctly
// document.querySelector(".location").textContent = data.network.name;
// console.log(data.network.name);

//

// claring the search box
// searchEl.value = "";
// }

// Saving the past searches into local storage
function saveCitySearch(city) {
  let previousHistory = JSON.parse(localStorage.getItem("searchHistory")) || {};
  previousHistory[city] = true;
  localStorage.setItem("searchHistory", JSON.stringify(previousHistory));
}