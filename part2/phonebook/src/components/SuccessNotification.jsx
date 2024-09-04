const SuccessNotification = ({ successNotification }) => {
    if (successNotification === null) {
        return null
    }
    return (
        <div className='success'>
            {successNotification}
        </div>
    )
}

export default SuccessNotification