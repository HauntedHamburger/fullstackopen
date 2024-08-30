const Person = ({ id, name, number, removePerson }) => {
    return (
        <li key={id} className="flex">
            <span>{name}:</span>
            <span>{number}</span>
            <button onClick={() => removePerson(id)}>Remove</button>
        </li>
    )
}

export default Person