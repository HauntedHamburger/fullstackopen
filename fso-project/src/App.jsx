import { useState, useEffect } from "react"
import peopleService from './services/people'
import People from "./components/People"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPeople, setSearchPeople] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    peopleService
      .getAll()
      .then(initPeople => {
        setPeople(initPeople)
      })
  }, [])
  
  const handleAddName = e => { setNewName(e.target.value) }
  const handleAddNumber = e => { setNewNumber(e.target.value) }
  const handleSearch = e => { setSearchPeople(e.target.value.toLowerCase()) }

  const addPerson = e => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(people.length + 1),
    }

    const existingPerson = people.find(person => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} already exists. Replace their old number?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        peopleService
          .update(updatedPerson.id, updatedPerson)
          .then(res => {
            setPeople(people.map(p => p.id !== existingPerson.id ? p : res))
            setNotification({
                text: `${updatedPerson.name}'s contact information has been updated successfully.`,
                className: 'success'
            })
            setTimeout(() => {
              setNotification(null)
            }, 3000)
            setNewNumber('')
            setNewName('')
          })
      }
      return
    } else {
      peopleService
        .create(personObject)
        .then(res => {
          setPeople(people.concat(personObject))
          setNotification({
            text: `${personObject.name} has been added to your contact list.`,
            className: 'success'
          })
          setTimeout(() => {
            setNotification(null)
          }, 3000)
          setNewName('')
          setNewNumber('')
        })
        .catch(err => {
          setNotification({
            text: `Unable to add ${personObject.name} because 🤷🤷‍♀️🤷‍♂️`,
            className: 'error'
          })
          console.log(err)
        })
    }
  }

  const removePerson = id => {
    const person = people.find(p => p.id === id)

    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      peopleService
        .remove(person.id)
        .then(() => {
          const updatedPeople = people.filter(p => p.id !== id)
          setPeople(updatedPeople)
          setNotification({
            text: `${person.name} has been removed to your contact list.`,
            className: 'error'
          })
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
        .catch(err => {
          setNotification({
            text: `Unable to add ${personObject.name} because 🤷🤷‍♀️🤷‍♂️`,
            className: 'error'
          })
          setTimeout(() => {
            setNotification(null)
          }, 3000)
          console.log(err)
        })
    }
  }

  const peopleToShow = searchPeople
    ? people.filter(person => person.name.toLowerCase().includes(searchPeople) )
    : people

  return (
    <div className="pb-container">
      <h1>Phonebook</h1>
      
      <Notification message={notification} />

      <Filter 
        searchPeople={searchPeople}
        handleSearch={handleSearch}
      />

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleAddName={handleAddName}
        handleAddNumber={handleAddNumber}
      />

      <h2>Contacts</h2>
      
      <People
        people={peopleToShow}
        removePerson={removePerson}
      />
    </div>
  )
}

export default App