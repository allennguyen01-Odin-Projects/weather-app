const API_KEY = 'd10b241ea8ca4d6781a233022231307';

async function getCurrentWeather(city = 'calgary') {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`,
  );
  const weatherData = await response.json();
  console.log(weatherData);
}

getCurrentWeather();
