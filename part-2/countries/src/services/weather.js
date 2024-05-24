import axios from 'axios';

const apiKey = import.meta.env.VITE_WEATHER_KEY;
const baseUrl = 'http://api.openweathermap.org';

const getWeatherInfo = cityName => {
    const request = axios.get(`${baseUrl}/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`);
    return request
      .then(response => {
        const lat = response.data[0].lat;
        const lon = response.data[0].lon;

        return axios.get(`${baseUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
          .then(response => response.data);
    });
}

export default { getWeatherInfo };
