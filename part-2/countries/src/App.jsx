import { useState, useEffect } from 'react';
import countriesService from './services/countries';
import SearchBar from './components/SearchBar';
import List from './components/List';
import Country from './components/Country';

const App = () => {
  const [countryNames, setCountryNames] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchMatches, setSearchMatches] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState(null);

  // On mount, fetch country names from server
  useEffect(() => {
    countriesService
      .getAll()
      .then((countries) => (
        setCountryNames(countries.map((country) => country.name.common))
      ));
  }, []);

  // Update search matches as search bar value changes
  useEffect(() => {
    setSearchMatches(
      countryNames.filter((name) => (
        name.toLowerCase().includes(searchValue.toLowerCase().trim())
      ))
    );
  }, [searchValue]);

  useEffect(() => {
    if (searchMatches.length === 1) {
      countriesService
        .getByName(searchMatches[0])
        .then((country) => setSearchedCountry(country));
    } else {
      setSearchedCountry(null);
    }
  }, [searchMatches]);

  const updateSearchValue = (event) => setSearchValue(event.target.value);

  return (
    <div>
      <SearchBar searchValue={searchValue} updateSearchValue={updateSearchValue} />
      <List list={searchMatches} />
      <Country country={searchedCountry} />
    </div>
  );
};

export default App;
