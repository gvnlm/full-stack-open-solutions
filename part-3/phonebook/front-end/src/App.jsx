import { useState, useEffect } from 'react';
import Numbers from './components/Numbers';
import NumberForm from './components/NumberForm';
import Filter from './components/Filter';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
  // Constants
  const NOTIFICATION_TIMEOUT = 5000;

  // States
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [notification, setNotification] = useState(null);

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
        .then((editedPerson) => {
          setPersons(
            persons.map(
              (person) => (person.id === editedPerson.id) ? editedPerson : person
            )
          );
          notify(`Edited ${editedPerson.name}'s number`, 'success');
        });
    } else {
      personService
        // Add new person to back-end server (i.e., db.json)
        .add({ name: newNameTrimmed, number: newNumber })
        // Render new person to screen
        .then((person) => {
          setPersons([...persons, person]);
          notify(`Added ${newNameTrimmed}`, 'success');
        });
    }

    setNewName('');
    setNewNumber('');
  };

  const removePerson = (id) => {
    const name = persons.find((person) => person.id === id).name;

    if (!window.confirm(`Delete ${name} ?`)) {
      return;
    }
    
    personService
      .remove(id)
      .then(() => notify(`Removed ${name}`, 'success'))
      .catch(() => notify(`Information of ${name} has already been removed from server`, 'error'));

    setPersons(persons.filter((person) => person.id !== id));
  };

  const notify = (message, type) => {
    // If there is already a timeout queued, clear it so that it does not 
    // prematurely set the new notification message to null
    if (notification) {
      clearTimeout(notification.timeoutId);
    }
    
    setNotification({
      message,
      type,
      timeoutId: setTimeout(() => setNotification(null), NOTIFICATION_TIMEOUT),
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter value={nameFilter} handleChange={updateNameFilter} />
      <NumberForm
        name={newName}
        handleNameChange={updateNewName}
        number={newNumber}
        handleNumberChange={updateNewNumber}
        handleSubmit={addNewNumber}
      />
      <Numbers 
        persons={persons} 
        nameFilter={nameFilter} 
        removePerson={removePerson} 
      />
    </div>
  );
};

export default App;
