// API Variables
var cityBikeApiUrl = "http://api.citybik.es/v2/networks";
var searchBtnEl = document.querySelector(".search-btn")
var containerEl = document.querySelector(".container");
var searchEl = document.querySelector(".search");


// setting display to none upon opening
containerEl.style.display = "none";

// event listener upon clicking search
searchBtnEl.addEventListener("click", function (event, data) {
  event.preventDefault();
  containerEl.style.display = "block";

  if (searchEl.value.trim() || searchEl.value.trim() !== "") {
    let city = searchEl.value.trim();
    // do the actual search
    saveCitySearch(city);
  }

  // fetching the weather API data
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
      searchEl.value +
      "&appid=a411ef0030322e0862cd44cde300dd84&units=imperial"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      document.querySelector(".temp").textContent = data.main.temp
      console.log(data.main.temp)

      document.querySelector(".description").textContent = data.weather[0].description
      console.log(data.weather[0].description)

      // can pull other icons from another source if you want
      var weatherIcon = data.weather[0].icon
      var weatherIconUrl = "https://openweathermap.org/img/wn/"+ weatherIcon +".png"
      document.querySelector(".icon").setAttribute("src", weatherIconUrl) 
      console.log(weatherIconUrl)


    });
  console.log(searchEl.value);

  
  // things to call with weather api
  // data.weather.0.icon
  // data.sys.sunrise
  // data.sys.sunset


  // fetched CityBike API
fetch(cityBikeApiUrl)
.then((response) => response.json())
.then((data) => console.log(data));

// 
//  var city = data.networks.location.city

  // claring the search box
  searchEl.value = "";
});


function saveCitySearch(city) {
  let previousHistory = JSON.parse(localStorage.getItem("searchHistory")) || {};
  previousHistory[city] = true;
  localStorage.setItem("searchHistory", JSON.stringify(previousHistory));
}









