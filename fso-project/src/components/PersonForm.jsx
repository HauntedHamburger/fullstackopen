const PersonForm = ({ addPerson, newName, newNumber, handleAddName, handleAddNumber }) => {
    return (
        <>
            <h2>Add Contact</h2>
            <form onSubmit={addPerson}>
                <div className="flex-input">
                <div>
                    <h3>Name:</h3>
                    <input 
                    value={newName}
                    onChange={handleAddName}
                    />
                </div>
                <div>
                    <h3>Number:</h3>
                    <input 
                    value={newNumber}
                    onChange={handleAddNumber}
                    />
                </div>
                </div>

                <div>
                <button type="submit">Add</button>
                </div>
            </form>
        </>
    )
}
export default PersonForm