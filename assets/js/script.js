var cityInputEl = document.querySelector("#city-name");
var userInputEl = document.querySelector("#button-addon2");
var weatherEl = document.querySelector("#weather-card");
var cityHeader = document.getElementById("city-date");
var tempEl = document.getElementById("temp");
var humidityEl = document.getElementById("humidity");
var windEl = document.getElementById("wind");
var uvEl = document.getElementById("uv-index");
var forecast = document.getElementById("future-forecast");
var date = moment().format('MMMM Do YYYY');

var dayOne = document.getElementById("dayOne");
var dayTwo = document.getElementById("dayTwo");
var dayThree = document.getElementById("dayThree");
var dayFour = document.getElementById("dayFour");
var dayFive = document.getElementById("dayFive");

//get city weather data
var apiKey = "9926c56f6fbd3fdacab8dafcc1b3d945";

//assembles the api url with the city the user entered and fetches that data
var getCityWeather = function(city) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    var apiURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;
    //make a request to the url
    fetch(apiURL)
    .then(function(response) {
        return response.json();
         })
         .then(json => {
            displayWeather(json);
            return fetch(apiURLForecast);
         }) 
         .then(response => {
             return response.json();
         })
         .then(json => {
            return displayForecast(json);
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
    //toggles weatherEl from hidden to visible to show weather data
    weatherEl.removeAttribute('hidden');
    //creates h1 of the city's name and current date
    cityHeader.textContent = json.name + " " + date;
    //display current temperature
    tempEl.textContent = json.main.temp;
    //display humidity
    humidityEl.textContent = json.main.humidity;
    //display wind speed
    windEl.textContent = json.wind.speed + "MPH";
    //display UV index
    
}


var displayForecast = function(json) {
    forecast.removeAttribute('hidden');
    dayOne.textContent = json.list[2].temp;
    dayTwo.textContent = json.list[10].temp;
    dayThree.textContent = json.list[18].temp;
    dayFour.textContent = json.list[26].temp;
    dayFive.textContent = json.list[34].temp;
}





userInputEl.addEventListener("click", citySubmit);