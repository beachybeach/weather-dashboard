cityInputEl = document.querySelector("#city-name");
userInputEl = document.querySelector("#button-addon2");

//get city weather data
var apiKey = "9926c56f6fbd3fdacab8dafcc1b3d945";

//assembles the api url with the city the user entered and fetches that data
var getCityWeather = function(city) {
    //format the github api url
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    //make a request to the url
    fetch(apiURL)
    .then(function(response) {
        if (response.ok) {
            response.json() 
        }
    });
};


var citySubmit = function(event) {
    event.preventDefault();

    var cityName = cityInputEl.value.trim();

    if (cityName) {
        getCityWeather(cityName);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city name");
    }
    console.log(event);
}


userInputEl.addEventListener("click", citySubmit);