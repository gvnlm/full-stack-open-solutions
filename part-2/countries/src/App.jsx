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
      ))
      .catch(() => alert(`Failed to fetch data from ${countriesService.BASE_URL}`));
  }, []);

  // Whenever search value changes, update search matches if necessary
  useEffect(() => {
    const newSearchMatches = countryNames.filter(
      (name) => name.toLowerCase().includes(searchValue.toLowerCase().trim())
    );

    // If search matches have not changed, do nothing
    if (arraysAreEqual(searchMatches, newSearchMatches)) {
      return;
    }

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

  const showCountry = (countryName) => {
    setSearchMatches([]);
    countriesService
      .getByName(countryName)
      .then((country) => setSearchedCountry(country));
  };

  return (
    <div>
      <SearchBar searchValue={searchValue} updateSearchValue={updateSearchValue} />
      <List list={searchMatches} showCountry={showCountry} />
      <Country country={searchedCountry} />
    </div>
  );
};

// Returns true iff arrays xs and ys contain the same values in the same order
const arraysAreEqual = (xs, ys) => {
  if (xs.length !== ys.length) {
    return false;
  }

  return xs.every((x, index) => x === ys[index]);
};

export default App;
