import { useState, useEffect } from 'react'
import personService from './services/people'
import People from './components/People'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'

import './App.css'
import './index.css'

const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState('')
  const [filterPerson, setFilterPerson] = useState(persons)
  const [errorNotification, setErrorNotification] = useState(null)
  const [successNotification, setSuccessNotification] = useState(null)

  
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

    const existingPerson = persons.find(p => p.name === newName)
    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} already exists, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        personService
          .update(updatedPerson.id, updatedPerson)
          .then(resPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? person : resPerson))
            setSuccessNotification(`${resPerson.name} number updated!`)
          })
          .catch((err) => {
            setErrorNotification(`${existingPerson.name}'s information has already been removed.`, err)
            setTimeout(() => {
              setErrorNotification(null)
              setPersons(persons.filter(p => p.id !== existingPerson.id))
            }, 5000)
          })
      }
      return
    }
    

    // const theyDoExist = persons.find(p => p.name === newName)
    //   if (theyDoExist) {
    //     setErrorNotification(`Whoops, ${newName} already exists in your contact list.`)
    //     setTimeout(() => {
    //       setErrorNotification(null)
    //     }, 5000)
    //     return
    // }

    personService
      .create(personObject)
      .then(resPerson => {
        setPersons(persons.concat(resPerson))
        setNewName('')
        setNewNumber('')
        setSuccessNotification(`${resPerson.name} was successfully added!`)
        setTimeout(() => {
          setSuccessNotification(null)
        }, 5000)
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
          setErrorNotification(`Sorry, you are stuck with ${person.name}!`, err)
          setTimeout(() => {
            setErrorNotification(null)
          }, 5000)
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

      <ErrorNotification
        errorNotification={errorNotification}
      />
      <SuccessNotification 
        successNotification={successNotification}
      />

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
      <People 
        people={persons}
        removePerson={removePerson}
      />

    </div>
  )
}

export default App