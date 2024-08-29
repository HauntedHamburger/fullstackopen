import axios from 'axios'
import { useState, useEffect } from 'react'
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
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
      })
  }, [])

  const addPerson = e => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    } 

    const theyDoExist = persons.find(person => person.name === newName)
      if (theyDoExist) {
        alert(`Nah bra, ${newName} is already up in here.`)
        return
      }
      setPersons(persons.concat(personObject))
      setFilterPerson(filterPerson.concat(personObject))
      setNewName('')
      setNewNumber('')
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
      />

    </div>
  )
}

export default App