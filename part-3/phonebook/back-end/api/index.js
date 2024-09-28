const MORGAN_FORMAT_STRING = ':method :url :status :res[content-length] - :response-time ms :request-body';
const DEPLOYMENT_DOMAIN = 'https://phonebook-back-end.vercel.app'

// Imports
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const morgan = require('morgan');
const cors = require('cors');

// Set up Express application
const app = express();
app.use(cors());
app.use(express.json());
morgan.token('request-body', (request, response) => JSON.stringify(request.body));
app.use(morgan(MORGAN_FORMAT_STRING));

// Data
let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/', (request, response) => {
  const requestReceivedAt = new Date();
  response.send(`
    <p>
      Phonebook has info for ${persons.length} people<br/>
      ${requestReceivedAt}
    </p>
    <table>
      <thead>
        <tr>
          <th>Endpoint</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a href=${DEPLOYMENT_DOMAIN}/api/persons>/api/persons</a></td>
          <td>All people</td>
        </tr>
        <tr>
          <td><a href=${DEPLOYMENT_DOMAIN}/api/persons/1>/api/persons/{id}</a></td>
          <td>Search by person's id</td>
        </tr>
      </tbody>
    </table>
  `);
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const targetId = request.params.id;
  const targetPerson = persons.find(({ id }) => id === targetId);

  if (targetPerson) {
    response.json(targetPerson);
  } else {
    response.status(404).end('Resource not found');
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const targetId = request.params.id;
  persons = persons.filter(({ id }) => id !== targetId);
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const newPerson = { ...request.body, id: uuidv4() };

  if (!newPerson.name) {
    response.status(400).end('Name is missing');
    return;
  }

  if (!newPerson.number) {
    response.status(400).end('Number is missing');
    return;
  }

  if (persons.some((person) => person.name === newPerson.name)) {
    response.status(400).end(`${newPerson.name} already has an entry`);
    return;
  }

  persons = [ ...persons, newPerson ];
  response.status(201).json(newPerson);
});


module.exports = app;
