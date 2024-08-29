import Person from './Person'

const Persons = ({ persons, handleRemove }) => {
    return (
        <ul>
            {persons.map(persons => 
                <Person
                    id={persons.id}
                    key={persons.id} 
                    name={persons.name} 
                    number={persons.number}
                    handleRemove={handleRemove}
                />
            )}
        </ul>
    )
}

export default Persons