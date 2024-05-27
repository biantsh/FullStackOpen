const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
app.use(morgan((tokens, request, response) => {
    return [
        tokens.method(request, response),
        tokens.url(request, response),
        tokens.status(request, response),
        tokens.res(request, response, 'content-length'), '-',
        tokens['response-time'](request, response), 'ms',
        JSON.stringify(request.body),
        JSON.stringify(persons)
    ].join(' ');
}));

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

const generateId = () => {
    return Math.floor(Math.random() * 1_000_000_000);
}

app.get('/info', (request, response) => {
    const date = new Date().toString();
    response.send(`<p>Phonebook has info for ${persons.length} people.</p> <p>${date}</p>`);
});

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(p => p.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
}); 

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name or number is missing.'
        });
    }

    if (persons.find(p => p.name === body.name)) {
        return response.status(400).json({
            error: 'Name must be unique'
        });
    }

    const person = {
        "id": generateId(),
        "name": body.name,
        "number": body.number
    }
    persons = persons.concat(person);

    response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(p => p.id !== id);

    response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Listenining on port ${PORT}`);
});
