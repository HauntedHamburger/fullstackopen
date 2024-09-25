const Person = ({ id, name, number, removePerson }) => {
    return (
        <li key={id}>
            <span>{name}: {number}  </span>
            <button onClick={() => removePerson(id)}>Remove</button>
        </li>
    )
}

export default Person