const OPEN_WEATHER_API_URL = 'https://openweathermap.org/api';

const Weather = ({ location, temperature }) => {
  return (
    <>
      <h2>
        Weather in {location} (via{' '}
        <a
          href={OPEN_WEATHER_API_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenWeather
        </a>
        )
      </h2>
      <div>{kelvinToCelsius(temperature).toFixed(2)}&deg;C</div>
    </>
  );
};

const kelvinToCelsius = (k) => k - 273.15;

export default Weather;
