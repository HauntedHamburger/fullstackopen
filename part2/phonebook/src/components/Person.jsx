const Person = ({ id, name, number, handleRemove }) => {
    return (
        <li>
            {name}: 
            {number}
            <button onClick={() => handleRemove(id)}>Delete</button>
        </li>
    )
}

export default Person