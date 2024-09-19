const Numbers = ({ persons, nameFilter }) => {
  const personsFiltered = (
    persons.filter(
      ({ name }) => name.toLowerCase().includes(nameFilter.toLowerCase().trim())
    )
  );

  return (
    <>
      <h2>Numbers</h2>
      {personsFiltered.map(({ name, number }) => <p key={name}>{name} {number}</p>)}
    </>
  );
};

export default Numbers;
