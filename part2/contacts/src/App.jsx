import { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import './App.css'

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
  
  const addPerson = e => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    } 

    const theyDoExist = persons.find(p => p.name === newName)
      if (theyDoExist) {
        alert(`Nah bra, ${newName} is already up in here.`)
        return
    }

    personService
      .create(personObject)
      .then(resPerson => {
        setPersons(persons.concat(resPerson))
        setNewName('')
        setNewNumber('')
      })
  }


  const removePerson = id => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          const updatePersons = persons.filter(p => p.id !== id)
          setPersons(updatePersons)
          setFilterPerson(updatePersons)
        })
        .catch(err => {
          console.log(`Error deleting person:`, err)
          alert(`Failed to deleted ${person.name}`)
        })
    }
  }

  const handleNameChange = e => {
    setNewName(e.target.value)
  }

  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }

  const handleFilterPerson = filteredPersons => {
    setFilterPerson(filteredPersons)
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <h3>Search</h3>
      <Filter 
        persons={persons}
        searchPerson={searchPerson}
        setSearchPerson={setSearchPerson}
        handleFilterPerson={handleFilterPerson}
      />

      <h3>New Contact</h3>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      
      
      <h3>Numbers</h3>
      <Persons 
        persons={persons}
        removePerson={removePerson}
      />

    </div>
  )
}

export default App