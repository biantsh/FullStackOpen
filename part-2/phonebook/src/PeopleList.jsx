import Person from './Person';

const PeopleList = ({ personsToShow, onDelete }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <Person key={person.id} personObject={person} onDelete={onDelete}></Person>
        )}
      </ul>    
    </>
  )
}

export default PeopleList;
