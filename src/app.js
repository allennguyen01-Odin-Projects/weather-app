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
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const time = datetime.toLocaleTimeString();

  return { date, time };
}

async function getCurrentWeatherData(city = 'calgary') {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`,
  );

  const weatherData = await response.json();
  return weatherData;
}

getCurrentWeatherData().then((data) => {
  const weatherData = data;
  console.log(weatherData);

  const cityName = document.getElementById('city-name');
  const currentTime = document.getElementById('current-time');
  const currentDate = document.getElementById('current-date');
  const currentTemp = document.getElementById('current-temp');
  const currentCondition = document.getElementById('current-condition');

  const location = getLocation(weatherData);
  const localTime = getLocalTime(weatherData);

  cityName.textContent = `${location.city}, ${location.country}`;
  currentTime.textContent = `${localTime.time}`;
  currentDate.textContent = `${localTime.date}`;
  currentTemp.textContent = `${weatherData.current.temp_c} °C`;
  currentCondition.textContent = `${weatherData.current.condition.text}`;
});
