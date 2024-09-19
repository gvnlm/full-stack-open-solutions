import { useState } from 'react';
import Numbers from './components/Numbers';
import NumberForm from './components/NumberForm';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-1234567'}]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const updateNewName = (event) => setNewName(event.target.value);
  const updateNewNumber = (event) => setNewNumber(event.target.value);
  const addNewNumber = (event) => {
    event.preventDefault();

    // Ensure both input fields are non-empty
    if (newName === '') {
      alert('Please enter a name.')
      return;
    }
    if (newNumber === '') {
      alert('Please enter a number.')
      return;
    }

    // Remove leading and trailing whitespace characters
    const newNameTrimmed = newName.trim();

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
      <NumberForm 
        name={newName} 
        handleNameChange={updateNewName}
        number={newNumber}
        handleNumberChange={updateNewNumber} 
        handleSubmit={addNewNumber}
      />
      <Numbers persons={persons} />
    </div>
  );
};

export default App;
