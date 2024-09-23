import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const getCurrentWeather = (lat, lon) => (
  axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then((response) => response.data)
);

export default { 
  getCurrentWeather, 
};
