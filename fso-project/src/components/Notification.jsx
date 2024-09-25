const Notification = ({ message }) => {
    if (!message || !message.text || !message.className) {
        return null
    } 

    return (
        <div className={message.className}>
            {message.text}
        </div>
    )
}

export default Notification