const PersonForm = ({ addNewPerson, newName, newNumber, handlePersonChange, handleNumberChange}) => {
    return (
        <form onSubmit={addNewPerson}>
        <div>name: 
          <input 
            value={newName}
            onChange={handlePersonChange}
          />
        </div>
        <div>number:
          <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div><button type="submit">add</button></div>
      </form>
    )
}

export default PersonForm