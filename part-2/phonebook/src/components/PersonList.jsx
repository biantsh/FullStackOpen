import Person from './Person';

const PersonList = ({ personsToShow, deletePerson }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <Person key={person.id} personObject={person} deletePerson={deletePerson}></Person>
        )}
      </ul>
    </>
  );
};

export default PersonList;
