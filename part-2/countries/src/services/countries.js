import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`);
    return request.then(response => response.data);
}

const getAllNames = () => {
    return getAll().then(response => 
        response.map(country => country.name.common));
}

const getCountryInfo = countryName => {
    const request = axios.get(`${baseUrl}/name/${countryName}`);
    return request.then(response => response.data);
}

export default { getAll, getAllNames, getCountryInfo };
