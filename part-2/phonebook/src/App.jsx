import { useState, useEffect } from 'react';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons);
      })
  }, 
  []);

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

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (existingPersons.length > 0) {
      personService
        .update(existingPersons[0].id, personObject)
        .then(updatedPerson => {
          setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
        })
        .catch(error => {
          console.log('Cancel update.')
        })
      return;
    }

    personService
      .create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
      })
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  const deletePerson = (person) => {
    return () => {
      personService
        .remove(person)
        .then(response => {
          setPersons(persons.filter(p => p.id !== person.id));
        })
        .catch(error => {
          console.log('Cancelled deletion.');
        })
    }
  }

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
            <button onClick={deletePerson(person)}>Delete</button>
          </li>  
        )}
      </ul>
    </div>
  )
}

export default App;
