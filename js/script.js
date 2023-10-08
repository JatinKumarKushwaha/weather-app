// Get geolocation, if it's not avaliable use IP to get the location
const options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
};

function success(pos) {
	const crd = pos.coords;

	getWeatherDataLoc(`${crd.latitude}`, `${crd.longitude}`);
}

function error(err) {
	console.error(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

api_url = "https://api.openweathermap.org/data/2.5/weather";
api_key = "469d506c2222eafe82e4a0dbac9992f1";
// https://api.openweathermap.org/data/2.5/weather?q=seoni&appid=469d506c2222eafe82e4a0dbac9992f1&units=metric

// Function to get weather data for a given latitude and longitude
async function getWeatherDataLoc(lat, lon) {
	// Fetching weather data from OpenWeatherMap API
	let url = `${api_url}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
	fetch(url)
		.then(response => response.json())
		.then(data => {
			updateWeatherData(data);
		})
		.catch(error => {
			console.error('Error: fetching weather data', error)
		})
}

// Function to get weather data for a given city
async function getWeatherData(city) {
	// Fetching weather data from OpenWeatherMap API
	let url = `${api_url}?q=${city}&appid=${api_key}&units=metric`;
	fetch(url)
		.then(response => response.json())
		.then(data => {
			updateWeatherData(data);
		})
		.catch(error => {
			console.error('Error: fetching weather data', error)
		})
}

// Update the UI with the weather data
function updateWeatherData(data) {

	const cityNameElement = document.getElementById('city-name');
	const dateTimeElement = document.getElementById('date-time');
	const temperatureElement = document.getElementById('temperature');
	const weatherConditionElement = document.getElementById('weather-condition');
	const humidityElement = document.getElementById('humidity');
	const windSpeedElement = document.getElementById('wind-speed');
	const weatherIcon = document.getElementById('weather-icon');

	cityNameElement.classList.remove("skeleton");
	cityNameElement.classList.remove("skeleton-text");

	dateTimeElement.classList.remove("skeleton");
	dateTimeElement.classList.remove("skeleton-text");

	temperatureElement.classList.remove("skeleton");
	temperatureElement.classList.remove("skeleton-text");

	weatherConditionElement.classList.remove("skeleton");
	weatherConditionElement.classList.remove("skeleton-text");

	humidityElement.classList.remove("skeleton");
	humidityElement.classList.remove("skeleton-text");

	windSpeedElement.classList.remove("skeleton");
	windSpeedElement.classList.remove("skeleton-text");

	weatherIcon.classList.remove("skeleton");
	weatherIcon.classList.remove("skeleton-text");

	cityNameElement.textContent = data.name + ", " + data.sys.country;
	dateTimeElement.textContent = new Date(data.dt * 1000);
	temperatureElement.textContent = Math.round(data.main.temp) + " °C";
	weatherConditionElement.textContent = data.weather[0].description;
	humidityElement.textContent = data.main.humidity + "%";
	windSpeedElement.textContent = data.wind.speed + " m/s";
	weatherIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
}

// Function to handle key input on text input
const cityInput = document.getElementById('city-input');
cityInput.addEventListener("keyup", ({ key }) => {
	if (key === "Enter") {
		const city = cityInput.value.trim();
		if (city !== '') {
			getWeatherData(city);
			cityInput.value = '';
		}
	}
})

// Function to handle search button click event
function handleSearchButton() {
	const city = cityInput.value.trim();
	if (city !== '') {
		getWeatherData(city);
		cityInput.value = '';
	}
}

// Add event listener to the search button
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', handleSearchButton);