const PeopleForm = ({ newName, newNumber, onSubmit, onNameChange, onNumberChange }) => {
  return (
    <form onSubmit={onSubmit} >
      <div>
        Name: <input value={newName} onChange={onNameChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default PeopleForm;
