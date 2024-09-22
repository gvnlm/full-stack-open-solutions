import { useState, useEffect } from 'react';
import Numbers from './components/Numbers';
import NumberForm from './components/NumberForm';
import Filter from './components/Filter';
import personService from './services/persons';

const App = () => {
  // States
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  // Effects
  useEffect(() => {
    // Get then render all persons from back-end server (i.e., db.json)
    personService
      .getAll()
      .then((persons) => setPersons(persons));
  }, []);

  // Event handlers
  const updateNewName = (event) => setNewName(event.target.value);
  const updateNewNumber = (event) => setNewNumber(event.target.value);
  const updateNameFilter = (event) => setNameFilter(event.target.value);
  const addNewNumber = (event) => {
    event.preventDefault();

    // Remove leading and trailing whitespace characters
    const newNameTrimmed = newName.trim();

    // Ensure both input fields are non-empty
    if (newNameTrimmed === '') {
      alert('Please enter a name.');
      return;
    }
    if (newNumber === '') {
      alert('Please enter a number.');
      return;
    }

    const duplicate = persons.find(({ name }) => name === newNameTrimmed);

    // If person's number is already in phonebook
    if (duplicate) {
      if (!window.confirm(`${newNameTrimmed} is already added to phonebook, replace the old number with a new one?`)) {
        return;
      }
      
      // Replace person's current number with new number
      personService
        // Edit person's number on back-end server (i.e., db.json)
        .edit(duplicate.id, { number: newNumber })
        // Edit person's number on screen
        .then((editedPerson) => (
          setPersons(
            persons.map(
              (person) => (person.id === editedPerson.id) ? editedPerson : person
            )
          )
        ));
      
      return;
    }

    personService
      // Add new person to back-end server (i.e., db.json)
      .add({ name: newNameTrimmed, number: newNumber })
      // Render new person to screen
      .then((person) => setPersons([...persons, person]));

    setNewName('');
    setNewNumber('');
  };

  const removePerson = (id) => {
    const name = persons.find((person) => person.id === id).name;

    if (!window.confirm(`Delete ${name} ?`)) {
      return;
    }

    personService.remove(id);
    setPersons(persons.filter((person) => person.id !== id));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={nameFilter} handleChange={updateNameFilter} />
      <NumberForm
        name={newName}
        handleNameChange={updateNewName}
        number={newNumber}
        handleNumberChange={updateNewNumber}
        handleSubmit={addNewNumber}
      />
      <Numbers persons={persons} nameFilter={nameFilter} removePerson={removePerson} />
    </div>
  );
};

export default App;
