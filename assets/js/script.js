"use strict";

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
var weatherIcon = document.createElement("img");

var dayOneTemp = document.getElementById("dayOneTemp");
var dayTwo = document.getElementById("dayTwoTemp");
var dayThree = document.getElementById("dayThreeTemp");
var dayFour = document.getElementById("dayFourTemp");
var dayFive = document.getElementById("dayFiveTemp");

var dayOneHumidity = document.getElementById("dayOneHumidity");
var dayTwoHumidity = document.getElementById("dayTwoHumidity");
var dayThreeHumidity = document.getElementById("dayThreeHumidity");
var dayFourHumidity = document.getElementById("dayFourHumidity");
var dayFiveHumidity = document.getElementById("dayFiveHumidity");

//get city weather data
var apiKey = "9926c56f6fbd3fdacab8dafcc1b3d945";

//assembles the api url with the city the user entered and fetches that data
var getCityWeather = function(city) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    var apiURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;
    //make a request to the url
    fetch(apiURL)
    .then(response => {
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
         .catch(err => alert("error"));
        };


var getUVIndex = function(json) {
    return fetch("https://api.openweathermap.org/data/2.5/uvi?lat=" + json.city.coord.lat + "&lon=" + json.city.coord.lon + "&appid=" + apiKey)
    .then(function (response) {
        return response.json();
    }) 
    .then(function (json) {
        var uvIndex = json.value;
        uvEl.textContent = uvIndex;

        if(uvIndex < 3) {
            uvEl.classList.add("badge-success");
        } else if(uvIndex >= 3 || uvIndex <= 5) {
            uvEl.classList.add("badge-primary");
        } else if(uvIndex >= 6 || uvIndex <= 7 ) {
            uvEl.classList.add("badge-warning");
        } else if(uvIndex >= 8 || uvIndex <= 10 ) {
            uvEl.classList.add("badge-danger");
        } else
        uvEl.classList.add("badge-dark");
    });
}

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
        previousCity.setAttribute("class", "btn btn-info btn-lg btn-block m-1");
        previousCity.setAttribute("id", "newBtn")
        previousCity.addEventListener("click", function() {
            getCityWeather(cityName);
        });
        
    } else {
        alert("Please enter a city name");
    }
}

    

var displayWeather = function(json) {
    //toggles weatherEl from hidden to visible to show weather data
    weatherEl.removeAttribute('hidden');
    //creates h1 of the city's name and current date
    cityHeader.textContent = json.name + " " + date;
    weatherIcon.src = "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png";
    cityHeader.appendChild(weatherIcon);
    //display current temperature
    tempEl.textContent = json.main.temp;
    //display humidity
    humidityEl.textContent = json.main.humidity;
    //display wind speed
    windEl.textContent = json.wind.speed + "MPH";
}


var displayForecast = function(json) {
    forecast.removeAttribute('hidden');

    dayOneTemp.textContent = json.list[2].main.temp;
    dayTwoTemp.textContent = json.list[10].main.temp;
    dayThreeTemp.textContent = json.list[18].main.temp;
    dayFourTemp.textContent = json.list[26].main.temp;
    dayFiveTemp.textContent = json.list[34].main.temp;

    dayOneHumidity.textContent = json.list[2].main.humidity;
    dayTwoHumidity.textContent = json.list[10].main.humidity;
    dayThreeHumidity.textContent = json.list[18].main.humidity;
    dayFourHumidity.textContent = json.list[26].main.humidity;
    dayFiveHumidity.textContent = json.list[34].main.humidity;
    getUVIndex(json);
}







userInputEl.addEventListener("click", citySubmit);
