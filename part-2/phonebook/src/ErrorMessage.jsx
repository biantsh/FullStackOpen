const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'green',
    backgroundColor: '#c4c4c4',
    border: '3.5px solid green',
    width: 500,
    marginBottom: '15px',
    fontSize: '25px',
    padding: '10px'
  }

  if (message === null) {
    return null;
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification;
