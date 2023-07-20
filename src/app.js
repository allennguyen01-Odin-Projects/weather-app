const API_KEY = 'd10b241ea8ca4d6781a233022231307';

function getLocation(weatherData) {
  return {
    city: weatherData.location.name,
    country: weatherData.location.country,
  };
}

function getLocalTime(weatherData) {
  const datetime = new Date(weatherData.location.localtime);
  const date = datetime.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  const time = datetime.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
  });

  return { date, time };
}

async function getCurrentWeatherData(city = 'calgary') {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`,
  );

  const weatherData = await response.json();
  return weatherData;
}

async function getLowHighData(city = 'calgary') {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`,
  );

  const forecastData = await response.json();
  const lowHighTemp = {
    lowTemp: forecastData.forecast.forecastday[0].day.mintemp_c,
    highTemp: forecastData.forecast.forecastday[0].day.maxtemp_c,
  };

  return lowHighTemp;
}

function getCityWeather() {
  const city = document.getElementById('search').value;

  getCurrentWeatherData(city)
    .then((data) => {
      const weatherData = data;
      const cityName = document.getElementById('city-name');
      const currentTime = document.getElementById('current-time');
      const currentDate = document.getElementById('current-date');
      const currentTemp = document.getElementById('current-temp');
      const currentCondition = document.getElementById('current-condition');
      const conditionIcon = document.getElementById('condition-icon');

      const location = getLocation(weatherData);
      const localTime = getLocalTime(weatherData);

      cityName.textContent = `${location.city}, ${location.country}`;
      currentTime.textContent = `${localTime.time}`;
      currentDate.textContent = `${localTime.date}`;
      currentTemp.textContent = `${weatherData.current.temp_c}°C`;
      currentCondition.textContent = `${weatherData.current.condition.text}`;
      conditionIcon.src = weatherData.current.condition.icon;
    })
    .catch(() => {
      alert(`City "${city}" is not a valid city. Try again.`);
    });

  getLowHighData(city).then((data) => {
    const lowHighTemp = document.getElementById('low-high-temp');
    lowHighTemp.textContent = `L: ${data.lowTemp}°C, H: ${data.highTemp}°C`;
  });
}

const searchSubmit = document.getElementById('search-submit');
searchSubmit.addEventListener('click', getCityWeather);

const citySearch = document.getElementById('search');
citySearch.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    getCityWeather();
  }
});

getCityWeather();
