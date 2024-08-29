const PersonForm = ({ addPerson, newName, newNumber, handleNameChange, handleNumberChange }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                <label>Name: </label>
                <input 
                    value={newName}
                    onChange={handleNameChange}
                />
            </div>

            <div>
                <label>Number: </label>
                <input 
                    value={newNumber}
                    onChange={handleNumberChange}
                />
            </div>
            
            <button type="submit">add</button>
        </form>
    )   
}

export default PersonForm