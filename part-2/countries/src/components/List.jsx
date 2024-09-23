const MAX_LIST_ITEMS = 10;
const STYLES = { listStyleType: 'none' };

const List = ({ list, showCountry }) => {
  if (list.length === 1) {
    return;
  }

  if (list.length > MAX_LIST_ITEMS) {
    return <div>Too many matches, specify another filter</div>;
  }

  // 1 < list.length <= 10
  return (
    list.map((name) => (
      <li key={name} style={STYLES}>
        {name}<button onClick={() => showCountry(name)}>show</button>
      </li>
    ))
  );
};

export default List;
