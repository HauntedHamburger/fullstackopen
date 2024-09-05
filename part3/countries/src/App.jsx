import { useEffect, useState } from 'react'
import countryService from './services/countries'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('useEffect run...')
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const countriesToShow = filter
    ? countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase())) : []

  const handleFilterChange = e => {
    setFilter(e.target.value)
  }
  

  return (
    <>
      <label>
        Find Countries:
        <input type='text' value={filter} onChange={handleFilterChange} />
      </label>
      
    </>
  )
}

export default App
