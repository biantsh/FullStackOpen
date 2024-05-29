import { useState, useEffect } from 'react';
import personService from './services/persons';
import Notification from './components/Notification';
import SearchFilter from './components/SearchFilter';
import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons);
      });
  },
  []);

  const addPerson = event => {
    event.preventDefault();

    const existingPersons = persons.filter(person =>
      person.name === newName);

    const personObject = {
      name: newName,
      number: newNumber
    };

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

        notify(`Added number for ${personObject.name}!`);
      })
      .catch(error => {
        notify(`Error: ${error.response.data.error}`);
      });
  };

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

        notify(`Updated number for ${personObject.name}!`);
      })
      .catch(error => {
        if (error.name === 'TypeError') {
          setPersons(persons.filter(p => p.id !== id));

          notify(`Error: Information for ${personObject.name} has already been removed from the server.`);
        } else {
          notify(`Error: ${error.response.data.error}`);
        }
      });
  };

  const deletePerson = person => {
    if (!window.confirm(`Remove ${person.name}?`)) {
      return;
    }

    personService
      .remove(person)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id));

        notify(`Deleted number for ${person.name}!`);
      });
  };

  const handleFilterChange = event => {
    setNameFilter(event.target.value);
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const notify = message => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <SearchFilter value={nameFilter} onChange={handleFilterChange} />
      <PersonForm newName={newName} newNumber={newNumber}
        onSubmit={addPerson} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />
      <PersonList personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
