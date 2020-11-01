var cityInputEl = document.querySelector("#city-name");
var userInputEl = document.querySelector("#button-addon2");
var weatherEl = document.querySelector("#weather-card");
var cityHeader = document.getElementById("city-date");
var tempEl = document.getElementById("temp");
var humidityEl = document.getElementById("humidity");
var windEl = document.getElementById("wind");
var uvEl = document.getElementById("uv-index");

var date = moment().format('MMMM Do YYYY');

//get city weather data
var apiKey = "9926c56f6fbd3fdacab8dafcc1b3d945";

//assembles the api url with the city the user entered and fetches that data
var getCityWeather = function(city) {
    //format the github api url
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    //make a request to the url
    fetch(apiURL)
    .then(function(response) {
        return response.json();
         })
         .then(displayWeather);
        };
    

//takes user input of city name and inputs it as a parameter for getCityWeather()
var citySubmit = function(event) {
    event.preventDefault();

    var cityName = cityInputEl.value.trim();
    if (cityName) {
        getCityWeather(cityName);
        cityInputEl.value = "";
        var listHeader = document.getElementById("previous-search");
        var previousCityEl = document.createElement("button");
        var previousCity = listHeader.appendChild(previousCityEl);
        previousCity.textContent = cityName;
        previousCity.setAttribute("type", "button");
        previousCity.setAttribute("class", "btn btn-primary btn-lg btn-block m-1");
    } else {
        alert("Please enter a city name");
    }
}
var displayWeather = function(json) {
    //creates h1 of the city's name
    weatherEl.removeAttribute('hidden');

    

    

}


userInputEl.addEventListener("click", citySubmit);

