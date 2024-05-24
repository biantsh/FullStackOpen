import { useState, useEffect } from 'react';

import countryService from './services/countries';

const Results = ({ resultsToShow }) => {
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    if (resultsToShow.length === 1) {
      countryService
        .getCountryInfo(resultsToShow[0])
        .then(info => {
            setCountryInfo(info);
        })
    } else {
        setCountryInfo(null);
    }
  }, [resultsToShow]);

  if (resultsToShow.length > 10) {
    return (
    <div>Too many matches, specify another filter.</div>
    )
  } else if (resultsToShow.length > 1) {
    return (
      <ul>
        {resultsToShow.map(result =>
          <li key={result}>{result}</li>
        )}
      </ul>      
    )
  } else if (resultsToShow.length === 1 && countryInfo) {
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
      </>
    )
  }
}

export default Results;
