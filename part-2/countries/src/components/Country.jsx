import { useState } from 'react';
import weatherService from '../services/openWeather';
import Languages from './Languages';
import Weather from './Weather';

const Country = ({ country }) => {
  const [temperature, setTemperature] = useState(null);

  if (!country) {
    return;
  }

  const {
    name: { common },
    capital,
    area,
    languages,
    flags: { png, alt },
    latlng: [lat, lon],
  } = country;

  weatherService
    .getCurrentWeather(lat, lon)
    .then((weather) => setTemperature(weather.main.temp));

  return (
    <div>
      <h1>{common}</h1>

      <p>
        capital: {capital}<br />
        area: {area} km<sup>2</sup>
      </p>

      <Languages languagesObject={languages} />

      <img src={png} alt={alt} />

      <Weather location={common} temperature={temperature} />
    </div>
  );
};

export default Country;
