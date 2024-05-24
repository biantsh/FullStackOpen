const ErrorMessage = ({ message }) => {
    const errorStyle = {
      color: 'red',
      backgroundColor: '#c4c4c4',
      border: '3.5px solid red',
      width: 500,
      marginBottom: '15px',
      fontSize: '25px',
      padding: '10px'
    }
  
    if (message === null) {
      return null;
    }
  
    return (
      <div style={errorStyle}>
        {message}
      </div>
    )
  }
  
  export default ErrorMessage;
  