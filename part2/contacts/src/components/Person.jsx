const Person = ({ id, name, number, removePerson }) => {
    return (
        <li key={id}>
            {name}:
            {number}
            <button onClick={() => removePerson(id)}>Remove</button>
        </li>
    )
}

export default Person