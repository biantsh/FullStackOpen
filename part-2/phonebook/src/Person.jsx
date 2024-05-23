const Person = ({ personObject, onDelete }) => {
  return (
    <>
      <li key={personObject.id}>
        {personObject.name}: {personObject.number}
        <button onClick={onDelete(personObject)}>Delete</button>
      </li>
    </>
  )
}

export default Person;
