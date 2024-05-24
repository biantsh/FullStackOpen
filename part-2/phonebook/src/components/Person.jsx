const Person = ({ personObject, deletePerson }) => {
  return (
    <>
      <li key={personObject.id}>
        {personObject.name}: {personObject.number}
        <button onClick={() => deletePerson(personObject)}>Delete</button>
      </li>
    </>
  )
}

export default Person;
