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


// when search button is clicked 
var citySave = function() {
	var cityName = cityNameEl.value; 
	if(!cityName) { alert("Please enter a city"); }
	currentWeather(cityName);
}

// populate 5 day forecast
var forecastFunction = function(lat, lon) {
	fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,minutely&appid=5ee845610c9466b9c16eac1440fc63ce')
	.then(function(response) {
		response.json().then(function(data) {
			console.log(data);
			// add uvi to current weather 
			var uviEl = document.createElement("p");
			uviEl.innerHTML = "UV Index: " + "<span id='uvi-span'> </span>"; 
			currentWeatherDataEl.appendChild(uviEl);
			var uviValueEl = document.querySelector("#uvi-span");
			var uviValue = data.current.uvi;
			uviValueEl.textContent = uviValue;
			// set color of uvi to intensity 
			if(uviValue < 3) {uviValueEl.className = "low uvi-span";}
			if(uviValue >= 3 && uviValue < 6) {uviValueEl.className = "moderate"; }
			if(uviValue >= 6 && uviValue < 8) {uviValueEl.className = "high"; }
			if(uviValue >= 8 && uviValue < 11) {uviValueEl.className = "very-high"; }
			if(uviValue >= 11) {uviValueEl.className = "extreme"; }
		});
	});
}


// function to get current weather data *missing uvi* 
var currentWeather = function(cityName) {
	if(!cityName) { cityName = "Orlando"; }
	// save cityName to local storage *** 

	fetch("http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=5ee845610c9466b9c16eac1440fc63ce&units=imperial")
	.then(function(response) {
		response.json().then(function(data) {
			console.log(data);
			//debugger;

			// if(data.message === "city not found") {
			// 	currentCityNameEl.textContent = "Error: Can not find city";
			// 	return;
			// };
			
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

			forecastFunction(lat, lon);
		});
	}).catch(function(error) {
        currentCityNameEl.innerHTML = "Can not connect to weather app";
    });
};

// load Orlando weather by default
currentWeather();

// change weather to user input
searchBtn.addEventListener("click", citySave);


//-------------------------------------------------------------------------------------------------------------
// fetch('')
// .then(function(response) {
// 	response.json().then(function(data) {
// 		console.log(data);
// 	});
// });

// open weather api key: 5ee845610c9466b9c16eac1440fc63ce

