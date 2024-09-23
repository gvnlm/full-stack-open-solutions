const Country = ({ country }) => {
  if (!country) {
    return;
  }

  const {
    name: { common },
    capital,
    area,
    languages,
    flags: { png, alt },
  } = country;

  return (
    <div>
      <h1>{common}</h1>

      <p>
        capital {capital}
        <br />
        area {area}
      </p>

      <h3>languages:</h3>

      <ul>
        {Object.values(languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img src={png} alt={alt} />
    </div>
  );
};

export default Country;
