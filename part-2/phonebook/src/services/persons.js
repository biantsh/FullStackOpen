import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = personObject => {
    const request = axios.post(baseUrl, personObject);
    return request.then(response => response.data);
}

const remove = person => {
    if (!window.confirm(`Remove ${person.name}?`)) {
        return Promise.reject(null);
    }

    const request = axios.delete(`${baseUrl}/${person.id}`);
    return request.then(response => response.data);
}

export default {getAll, create, remove};
