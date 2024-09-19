import { useState } from 'react';
import Numbers from './components/Numbers';
import NumberForm from './components/NumberForm';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const updateNewName = (event) => setNewName(event.target.value);
  const addNewNumber = (event) => {
    event.preventDefault();
    setPersons([...persons, { name: newName }]);
    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <NumberForm 
        name={newName} 
        handleNameChange={updateNewName} 
        handleSubmit={addNewNumber}
      />
      <Numbers persons={persons} />
    </div>
  );
};

export default App;
