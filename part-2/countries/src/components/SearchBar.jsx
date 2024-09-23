const SearchBar = ({ searchValue, updateSearchValue }) => (
  <>
    <label htmlFor="searchBar">find countries </label>
    <input
      id="searchBar"
      type="text"
      value={searchValue}
      onChange={updateSearchValue}
    />
  </>
);

export default SearchBar;
