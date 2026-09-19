const API_KEY = "470502a5a584b5389d94957ff2e547f5";
const CITY = "Warri";
const COUNTRY = "NG";

const currentWeatherElement = document.querySelector("#current-weather");
const forecastElement = document.querySelector("#forecast");

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY}&units=metric&appid=${API_KEY}`;

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY},${COUNTRY}&units=metric&appid=${API_KEY}`;

async function getWeather() {
	try {
		const [currentResponse, forecastResponse] = await Promise.all([
			fetch(currentWeatherUrl),
			fetch(forecastUrl),
		]);

		if (!currentResponse.ok) {
			throw new Error(
				`Current weather request failed: ${currentResponse.status}`,
			);
		}

		if (!forecastResponse.ok) {
			throw new Error(`Forecast request failed: ${forecastResponse.status}`);
		}

		const currentData = await currentResponse.json();
		const forecastData = await forecastResponse.json();

		displayCurrentWeather(currentData);
		displayForecast(forecastData);
	} catch (error) {
		console.error("Weather error:", error);

		currentWeatherElement.innerHTML = `
            <p class="error-message">
                Weather information is temporarily unavailable.
            </p>
        `;

		forecastElement.innerHTML = `
            <p class="error-message">
                Forecast information is temporarily unavailable.
            </p>
        `;
	}
}

function displayCurrentWeather(weather) {
	const temperature = Math.round(weather.main.temp);
	const description = weather.weather[0].description;
	const icon = weather.weather[0].icon;
	const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

	currentWeatherElement.innerHTML = `
        <h3>Current Conditions</h3>

        <div class="weather-main">

            <img
                class="weather-icon"
                src="${iconUrl}"
                alt="${description}"
                width="80"
                height="80"
            >

            <div>
                <p class="temperature">
                    ${temperature}°C
                </p>

                <p class="weather-description">
                    ${description}
                </p>
            </div>

        </div>

        <div class="weather-details">
            <span>
                <strong>Humidity:</strong>
                ${weather.main.humidity}%
            </span>

            <span>
                <strong>Feels like:</strong>
                ${Math.round(weather.main.feels_like)}°C
            </span>
        </div>
    `;
}

function getDateKey(timestamp, timezoneOffset) {
	const localDate = new Date((timestamp + timezoneOffset) * 1000);

	return localDate.toISOString().split("T")[0];
}

function formatForecastDate(timestamp, timezoneOffset) {
	const localDate = new Date((timestamp + timezoneOffset) * 1000);

	return new Intl.DateTimeFormat("en-NG", {
		weekday: "short",
		month: "short",
		day: "numeric",
	}).format(localDate);
}

function getThreeDayForecast(data) {
	const days = new Map();

	data.list.forEach((item) => {
		const dateKey = getDateKey(item.dt, data.city.timezone);

		if (!days.has(dateKey)) {
			days.set(dateKey, []);
		}

		days.get(dateKey).push(item);
	});

	return Array.from(days.values()).slice(1, 4);
}

function displayForecast(data) {
	const forecastDays = getThreeDayForecast(data);

	if (forecastDays.length < 3) {
		forecastElement.innerHTML = `
            <p class="error-message">
                Three-day forecast is currently unavailable.
            </p>
        `;
		return;
	}

	forecastElement.innerHTML = forecastDays
		.map((day) => {
			const representativeForecast = day[Math.floor(day.length / 2)];

			const averageTemperature =
				day.reduce((total, item) => total + item.main.temp, 0) / day.length;

			const temperature = Math.round(averageTemperature);

			const description = representativeForecast.weather[0].description;

			const icon = representativeForecast.weather[0].icon;

			const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

			const date = formatForecastDate(
				representativeForecast.dt,
				data.city.timezone,
			);

			return `
            <article class="forecast-card">

                <h4>${date}</h4>

                <img
                    src="${iconUrl}"
                    alt="${description}"
                    width="55"
                    height="55"
                >

                <p class="forecast-temperature">
                    ${temperature}°C
                </p>

                <p class="forecast-description">
                    ${description}
                </p>

            </article>
        `;
		})
		.join("");
}

getWeather();
