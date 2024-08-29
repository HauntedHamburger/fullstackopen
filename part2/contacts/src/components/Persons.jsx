import Person from './Person'

const Persons = ({ persons }) => {
    return (
        <ul>
            {persons.map(person =>
                <Person
                    id={person.id}
                    key={person.id}
                    name={person.name}
                    number={person.number}
                />
            )}
        </ul>
    )
}

export default Persons