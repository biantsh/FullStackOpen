import { useState, useEffect } from 'react';
import personService from './services/persons';
import SearchFilter from './SearchFilter';
import PeopleForm from './PeopleForm';
import PeopleList from './PeopleList';

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
      updatePerson(existingPersons[0].id, personObject);
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

  const updatePerson = (id, personObject) => {
    personService
      .update(id, personObject)
      .then(updatedPerson => {
        setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.log('Cancel update.')
      });
  }

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

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter value={nameFilter} onChange={handleFilterChange}></SearchFilter>
      <PeopleForm newName={newName} newNumber={newNumber} 
        onSubmit={addPerson} onNameChange={handleNameChange} onNumberChange={handleNumberChange} >
      </PeopleForm>
      <PeopleList personsToShow={personsToShow} onDelete={deletePerson}></PeopleList>
    </div>
  )
}

export default App;
