import { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = (props) => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState('')
  const [filterPerson, setFilterPerson] = useState(persons)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addNewPerson = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    personService
      .create(personObject)
      .then(res => {
        setPersons(persons.concat(res.data))
        setFilterPerson(filterPerson.concat(res.data))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleRemove = id => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          const updatedPersons = persons.filter(person => person.id !== id)
          setPersons(updatedPersons)
          setFilterPerson(updatedPersons)
        })
        .catch(error => {
          console.error('Error deleting person:', error)
          alert(`Failed to delete '${person.name}'. Error: ${error.message}`);
        })
    }
  }

  const handlePersonChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterPerson = (filteredPersons) => {
    setFilterPerson(filteredPersons);
  };


  return (
    <>
    <div>
      <h2>Phonebook</h2>
      <Filter 
        persons={persons}
        searchPerson={searchPerson}
        handleFilterPerson={handleFilterPerson}
        setSearchPerson={setSearchPerson}
      />
      <ul>
        {filterPerson.map(person => 
          <li key={person.id}> {person.name} </li>
        )}
      </ul>
      
      <h2>Add New Contact</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        addNewPerson={addNewPerson}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons 
        persons={persons}
        handleRemove={handleRemove}
      />
      
    </div>
    </>
  )
}

export default App