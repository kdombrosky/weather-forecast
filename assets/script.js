// DOM elements
var currentCityNameEl = document.querySelector("#current-city-name");
var currentDateEl = document.querySelector("#current-date");
var currentIconEl = document.querySelector("#current-icon");
var currentWeatherDataEl = document.querySelector("#current-weather-data");
var cityNameEl = document.querySelector("#city-name");
var searchBtn = document.querySelector("#submit");
var forecastEl = document.querySelector(".forecast");

// function to clear appended children
var clearContent = function() {
	while(currentWeatherDataEl.firstChild) {
        currentWeatherDataEl.removeChild(currentWeatherDataEl.firstChild);
    }

	while(forecastEl.firstChild) {
        forecastEl.removeChild(forecastEl.firstChild);
    }
};

// when search button is clicked 
var citySave = function() {
	var cityName = cityNameEl.value; 
	if(!cityName) { alert("Please enter a city"); }
	currentWeather(cityName);
}

// populate 5 day forecast
var forecastFunction = function(lat, lon, currentDate) {
	fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,minutely&units=imperial&appid=5ee845610c9466b9c16eac1440fc63ce')
	.then(function(response) {
		response.json().then(function(data) {
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

			for(i=0; i<5; i++) {
				// create container for forecast card
				var forecastDiv = document.createElement("div");
				forecastDiv.className = "forecast-item col";
				// add date to column 
				var newDate = moment(currentDate, "L").add((i+1), 'days').format("L");
				var forecastDate = document.createElement("h4");
				forecastDate.textContent = newDate;
				forecastDiv.appendChild(forecastDate);

				// add icon to column 
				var newForecast = data.daily[i].weather[0].icon;
				var forecastIcon = document.createElement("span");
				forecastIcon.innerHTML= "<img src='http://openweathermap.org/img/w/" + newForecast + ".png'/>";
				forecastDiv.appendChild(forecastIcon);

				// add temp to column 
				var futureTemp = data.daily[i].temp.day; 
				var forecastTemp = document.createElement("p");
				forecastTemp.textContent = "Temp: " + futureTemp + "°F";
				forecastDiv.appendChild(forecastTemp);

				// add wind speed to column
				var futureWind = data.daily[i].wind_speed; 
				var forecastWind = document.createElement("p");
				forecastWind.textContent = "Wind: " + futureWind + " MPH";
				forecastDiv.appendChild(forecastWind);

				// add humidity to column
				var futureHumidity = data.daily[i].humidity; 
				var forecastHumidity = document.createElement("p");
				forecastHumidity.textContent = "Humidity: " + futureHumidity + "%";
				forecastDiv.appendChild(forecastHumidity);
				// append container to html 
				forecastEl.appendChild(forecastDiv);
			}
		});
	});
}


// function to get current weather data *uvi in next function*
var currentWeather = function(cityName) {
	if(!cityName) { cityName = "Orlando"; }
	// save cityName to local storage *** 

	fetch("http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=5ee845610c9466b9c16eac1440fc63ce&units=imperial")
	.then(function(response) {
		response.json().then(function(data) {
			console.log(data);
			if(response.ok) {
			// grab data from api for current weather
			var lat = data.coord.lat; 
			var lon = data.coord.lon;
			var temp = data.main.temp;	//farenheit  
			var clouds = data.clouds;
			var windSpeed = data.wind.speed;	// mph
			var humidity = data.main.humidity;	// %
			
			// update current-weather with city name, date, and icon
			currentCityNameEl.innerHTML = cityName;
			var currentDate = moment().format("L");
			currentDateEl.textContent = currentDate;
			//var currentIcon = 
			// add icon representing clouds/sun/rain ***
			//currentIconEl.innerHTML= "<img src='http://openweathermap.org/img/w/" + data. + ".png'/>";
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

			forecastFunction(lat, lon, currentDate);
			} else {
				currentCityNameEl.innerHTML = "Error: Could not find city";
			}
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

