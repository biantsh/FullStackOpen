import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
  }
  , []);

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value);
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();

    const existingPersons = persons.filter(person => 
      person.name === newName);

    if (existingPersons.length > 0) {
      alert(`${newName} is already added to the phonebook!`);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    setNewName('');
    setNewNumber('');
    setPersons(persons.concat(personObject));
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with: <input value={nameFilter} onChange={handleFilterChange} />
      </div>
      <form onSubmit={addPerson} >
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <li key={person.name}>
            {person.name}: {person.number}
          </li>  
        )}
      </ul>
    </div>
  )
}

export default App;
