import { useState, useEffect } from 'react';
import personService from './services/persons';
import Notification from './Notification';
import ErrorMessage from './ErrorMessage';
import SearchFilter from './SearchFilter';
import PeopleForm from './PeopleForm';
import PeopleList from './PeopleList';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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

    setNotification(`Added number for ${personObject.name}!`);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }

  const updatePerson = (id, personObject) => {
    if (!window.confirm(`${personObject.name} is already added, replace the old number?`)) {
      return;
    }

    personService
      .update(id, personObject)
      .then(updatedPerson => {
        setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p));
        setNewName('');
        setNewNumber('');

        setNotification(`Updated number for ${personObject.name}!`);
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      })
      .catch(error => {
        setErrorMessage(`Information for ${personObject.name} has already been removed from the server.`)
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);

        setPersons(persons.filter(p => p.id !== id));
      });
  }

  const deletePerson = (person) => {
    return () => {
      personService
        .remove(person)
        .then(response => {
          setPersons(persons.filter(p => p.id !== person.id));

          setNotification(`Deleted number for ${person.name}!`);
          setTimeout(() => {
            setNotification(null);
          }, 3000);
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
      <ErrorMessage message={errorMessage} />
      <Notification message={notification} />
      <SearchFilter value={nameFilter} onChange={handleFilterChange} />
      <PeopleForm newName={newName} newNumber={newNumber} 
        onSubmit={addPerson} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />
      <PeopleList personsToShow={personsToShow} onDelete={deletePerson} />
    </div>
  )
}

export default App;
