import { useState } from "react"

const Filter = ({ persons }) => {
    const [searchPerson, setSearchPerson] = useState('')
    const [filterPerson, setFilterPerson] = useState([])

    const handleFilterPerson = e => {
        const searchValue = e.target.value.toLowerCase()
        setSearchPerson(searchValue)

        if (searchValue === '') {
            setFilterPerson([])
        } else {
            const filteredPerson = persons.filter(person => 
                person.name.toLowerCase().includes(searchValue)
            )
            setFilterPerson(filteredPerson)
        }
    }

    return (
        <div>
            <input
                value={searchPerson}
                onChange={handleFilterPerson}
                placeholder="Search..."
            />
            {searchPerson && (
                <ul>
                    {filterPerson.map((person) => (
                        <li key={person.id}>{person.name}</li>
                    ))}
                </ul>
            )}
        </div>
    )

}

export default Filter