// API Variables
var cityBikeApiUrl = "http://api.citybik.es/v2/networks";
var searchBtnEl = document.querySelector(".search-btn");
var containerEl = document.querySelector(".container");
var searchEl = document.querySelector(".search");

// containers display to none upon opening
containerEl.style.display = "none";

// event listener upon clicking search to display containers and fetch API's
searchBtnEl.addEventListener("click", function (event, data) {
  event.preventDefault();
  containerEl.style.display = "block";

  if (searchEl.value.trim() || searchEl.value.trim() !== "") {
    let city = searchEl.value.trim();
  
    saveCitySearch(city);
  }

  // WEATHER API FETCH
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchEl.value +
      "&appid=a411ef0030322e0862cd44cde300dd84&units=imperial"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector(".temp").textContent = data.main.temp;
      console.log(data.main.temp);

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
  console.log(searchEl.value);

  // CITYBIKE API FETCH
  fetch(cityBikeApiUrl)
    .then((response) => response.json())
    .then((data) => console.log(data));

    // not reading correctly
  // document.querySelector(".location").textContent =
  //   data.networks[0].location.city;
  // console.log(data.networks[0].location.city);
  //  var city = data.networks.location.city

  // claring the search box
  searchEl.value = "";
});

// Saving the past searches into local
function saveCitySearch(city) {
  let previousHistory = JSON.parse(localStorage.getItem("searchHistory")) || {};
  previousHistory[city] = true;
  localStorage.setItem("searchHistory", JSON.stringify(previousHistory));
}
