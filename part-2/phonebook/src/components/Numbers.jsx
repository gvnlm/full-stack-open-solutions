const Numbers = ({ persons, nameFilter, removePerson }) => {
  const personsFiltered = (
    persons.filter(
      ({ name }) => name.toLowerCase().includes(nameFilter.toLowerCase().trim())
    )
  );

  return (
    <>
      <h2>Numbers</h2>
      {personsFiltered.map(({ name, number, id }) => (
        <p key={name}>{name} {number} <button onClick={() => removePerson(id)}>delete</button></p>
      ))}
    </>
  );
};

export default Numbers;
