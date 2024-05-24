const WeatherInfo = ({ capitalName, weatherInfo }) => {
  const temperature = weatherInfo.list[0].main.temp;
  const windSpeed = weatherInfo.list[0].wind.speed;
  const weatherIcon = weatherInfo.list[0].weather[0].icon;

  return (
    <>
      <h1>Weather in {capitalName}</h1>
      <p>Temperature: {temperature} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}></img>
      <p>Wind: {windSpeed} m/s</p>
    </>      
  )
}

export default WeatherInfo;
