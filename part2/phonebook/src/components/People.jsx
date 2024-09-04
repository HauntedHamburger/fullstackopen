import Person from './Person'

const People = ({ people, removePerson }) => {
    return (
        <ul>
            {people.map(person =>
                <Person
                    id={person.id}
                    key={person.id}
                    name={person.name}
                    number={person.number}
                    removePerson={removePerson}
                />
            )}
        </ul>
    )
}

export default People