const Numbers = ({ persons }) => (
  <>
    <h2>Numbers</h2>
    {persons.map(({ name, number }) => <p key={name}>{name} {number}</p>)}
  </>
);

export default Numbers;
