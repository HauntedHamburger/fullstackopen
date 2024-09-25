const Filter = ({ searchPeople, handleSearch }) => {
    return (
        <div>
            <h3>Search Contacts:</h3>
            <input
                value={searchPeople}
                onChange={handleSearch}
            />
        </div>
    )
}

export default Filter