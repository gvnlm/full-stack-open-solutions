import { useState, useEffect } from 'react';
import axios from 'axios';
import Numbers from './components/Numbers';
import NumberForm from './components/NumberForm';
import Filter from './components/Filter';

const App = () => {
  // States
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  // Effects
  const fetchPersons = () => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => setPersons(response.data));
  };
  useEffect(fetchPersons, []);

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
      alert('Please enter a name.')
      return;
    }
    if (newNumber === '') {
      alert('Please enter a number.')
      return;
    }

    // Prevent user from adding already existing names in the phonebook
    if (persons.find(({ name }) => name === newNameTrimmed)) {
      alert(`${newNameTrimmed} is already added to phonebook`);
      return;
    }

    setPersons([...persons, { name: newNameTrimmed, number: newNumber }]);
    setNewName('');
    setNewNumber('');
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
      <Numbers persons={persons} nameFilter={nameFilter} />
    </div>
  );
};

export default App;
