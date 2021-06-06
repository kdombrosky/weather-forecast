// DOM elements
var currentCityNameEl = document.querySelector("#current-city-name");
var currentDateEl = document.querySelector("#current-day");
var currentWeatherDataEl = document.querySelector("#current-weather-data");
var cityNameEl = document.querySelector("#city-name");
var searchBtn = document.querySelector("#submit");

// function to clear appended children
var clearContent = function() {
	while(currentWeatherDataEl.firstChild) {
        currentWeatherDataEl.removeChild(currentWeatherDataEl.firstChild);
    }
};

// function to populate 5 day forecast 

// function to get current weather data *missing uvi* 
var currentWeather = function() {
	var cityName = cityNameEl.value; 
	if(!cityName) { cityName = "Orlando"; }

	fetch("http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=5ee845610c9466b9c16eac1440fc63ce&units=imperial")
	.then(function(response) {
		response.json().then(function(data) {
			//console.log(data);
			// grab data from api for current weather
			var lat = data.coord.lat; 
			var lon = data.coord.lon;
			var temp = data.main.temp;	//farenheit  
			var clouds = data.clouds;
			var windSpeed = data.wind.speed;	// mph
			var humidity = data.main.humidity;	// %
			// must get uvi from second api 	
			
			// update current-weather with city name, date, and icon
			currentCityNameEl.innerHTML = cityName;
			var currentDate = moment().format("L");
			currentDateEl.textContent = currentDate;
			// add icon representing clouds/sun/rain ***


			// update entire card with data: temp, wind speed, humidity, uvi
			clearContent();

			var tempEl = document.createElement("p");
			tempEl.textContent = "Temp: " + temp + "°F";
			currentWeatherDataEl.appendChild(tempEl);

			var windSpeedEl = document.createElement("p");
			windSpeedEl.textContent = "Wind: " + windSpeed + " MPH";
			currentWeatherDataEl.appendChild(windSpeedEl);

			var humidityEl = document.createElement("p");
			humidityEl.textContent = "Humidity: " + humidity + " %";
			currentWeatherDataEl.appendChild(humidityEl);

			var uviEl = document.createElement("p");
			uviEl.textContent = "UV Index: "; // add div box for uvi
			currentWeatherDataEl.appendChild(uviEl);
		});
	});
};

currentWeather();

searchBtn.addEventListener("click", currentWeather);


//-------------------------------------------------------------------------------------------------------------
// fetch('')
// .then(function(response) {
// 	response.json().then(function(data) {
// 		console.log(data);
// 	});
// });

// open weather api key: 5ee845610c9466b9c16eac1440fc63ce

var fetchFunction = function() {
	fetch('http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=5ee845610c9466b9c16eac1440fc63ce')
	.then(function(response) {
		response.json().then(function(data) {
			console.log(data);
		});
	});
	}
	
	//fetchFunction();