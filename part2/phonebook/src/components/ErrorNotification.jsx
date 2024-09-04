const ErrorNotification = ({ errorNotification }) => {
    if (errorNotification === null) {
        return null
    }
    return (
        <div className='error'>
            {errorNotification}
        </div>
    )
}

export default ErrorNotification