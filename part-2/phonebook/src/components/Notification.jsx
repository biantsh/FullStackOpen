const infoStyle = {
  color: 'green',
  backgroundColor: '#c4c4c4',
  border: '3.5px solid green',
  width: 500,
  marginBottom: '15px',
  fontSize: '25px',
  padding: '10px'
};

const errorStyle = {
  color: 'red',
  backgroundColor: '#c4c4c4',
  border: '3.5px solid red',
  width: 500,
  marginBottom: '15px',
  fontSize: '25px',
  padding: '10px'
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const style = message.toLowerCase().includes('error')
    ? errorStyle : infoStyle;

  return (
    <div style={style}>
      {message}
    </div>
  );
};

export default Notification;
