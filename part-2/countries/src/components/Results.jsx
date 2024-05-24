import { useState, useEffect } from 'react';

import countryService from '../services/countries';
import weatherService from '../services/weather';
import WeatherInfo from './WeatherInfo';

const Results = ({ resultsToShow, selectCountry }) => {
  const [countryInfo, setCountryInfo] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    if (resultsToShow.length === 1) {
      countryService
        .getCountryInfo(resultsToShow[0])
        .then(cInfo => {
            setCountryInfo(cInfo);

            weatherService
              .getWeatherInfo(cInfo.capital)
              .then(wInfo => {
                setWeatherInfo(wInfo);
            });
        })
    } else {
        setCountryInfo(null);
    }
  }, [resultsToShow]);

  if (resultsToShow.length > 10) {
    return (
    <div>Too many matches, specify another filter.</div>
    )
  } 
  else if (resultsToShow.length > 1) {
    return (
      <ul>
        {resultsToShow.map(result =>
          <li key={result}>
            {result}
            <button onClick={() => selectCountry(result)}>Show</button>
          </li>
        )}
      </ul>      
    )
  } 
  else if (resultsToShow.length === 1 && countryInfo && weatherInfo) {
    return (
      <>
        <h1>{countryInfo.name.common}</h1>
        <p>Capital: {countryInfo.capital}</p>
        <p>Area: {countryInfo.area} km2</p>

        <p><b>Languages:</b></p>
        <ul>
          {Object.values(countryInfo.languages).map(language => 
          <li key={language}>{language}</li>)}
        </ul>

        <img src={countryInfo.flags.png} alt={countryInfo.flags.alt}></img>

        <WeatherInfo capitalName={countryInfo.capital} weatherInfo={weatherInfo} />
      </>
    )
  }
}

export default Results;
