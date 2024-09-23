const MAX_LIST_ITEMS = 10;
const STYLES = { listStyleType: 'none' };

const List = ({ list }) => {
  if (list.length === 1) {
    return;
  }

  return (
    (list.length <= MAX_LIST_ITEMS)
      ? list.map((name) => <li key={name} style={STYLES}>{name}</li>)
      : <div>Too many matches, specify another filter</div>
  );
};

export default List;
