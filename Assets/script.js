// API Variables
var cityBikeApiUrl = "http://api.citybik.es/v2/networks";
var weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=dallas&appid=a411ef0030322e0862cd44cde300dd84";

// fetched CityBike API
fetch(cityBikeApiUrl)
  .then((response) => response.json())
  .then((data) => console.log(data));

  // fetched Weather API
fetch(weatherApiUrl)
.then((response) => response.json())
.then((data) => console.log(data));