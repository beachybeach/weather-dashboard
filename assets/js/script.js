var cityInputEl = document.querySelector("#city-name");
var userInputEl = document.querySelector("#button-addon2");
var weatherEl = document.querySelector("#weather-card");

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
         .then(function (json) {
         displayWeather(json);
         })
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
    for (var i = 0; i < json.weather.length; i++) {
        var result = json.weather[i];
        var item = document.createElement("p");
        console.log(result);
    }
}

userInputEl.addEventListener("click", citySubmit);