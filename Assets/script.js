// API Variables
var cityBikeApiUrl = "http://api.citybik.es/v2/networks";
var searchBtnEl = document.querySelector(".search-btn")
var containerEl = document.querySelector(".container");
var searchEl = document.querySelector(".search");


// setting display to none upon opening
containerEl.style.display = "none";

// event listener upon clicking search
searchBtnEl.addEventListener("click", function (event) {
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
      "&appid=a411ef0030322e0862cd44cde300dd84"
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
  console.log(searchEl.value);

  // fetched CityBike API
fetch(cityBikeApiUrl)
.then((response) => response.json())
.then((data) => console.log(data));

 var city = data.networks.location.city

  // claring the search box
  searchEl.value = "";
});


function saveCitySearch(city) {
  let previousHistory = JSON.parse(localStorage.getItem("searchHistory")) || {};
  previousHistory[city] = true;
  localStorage.setItem("searchHistory", JSON.stringify(previousHistory));
}









