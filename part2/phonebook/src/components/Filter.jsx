const Filter = ({ persons, setFilterPerson, setSearchPerson, searchPerson }) => {

    const handleFilterPerson = (e) => {
      const value = e.target.value.toLowerCase()
      setSearchPerson(value)
  
      if (value === '') {
        setFilterPerson(persons)
      } else {
        const filtered = persons.filter(person => 
          person.name.toLowerCase().includes(value)
        )
        setFilterPerson(filtered)
      }
    }
    
    return (
      <div>
        <input 
          value={searchPerson}
          onChange={handleFilterPerson}
          placeholder='Search...'
        />
      </div>
    )
}

export default Filter