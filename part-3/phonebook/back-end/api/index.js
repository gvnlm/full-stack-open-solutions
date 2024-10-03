const MORGAN_FORMAT_STRING = ':method :url :status :res[content-length] - :response-time ms :request-body';
const LOCAL_PORT = 3001;

// Imports
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('../models/person');

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

app.get('/', (request, response, next) => {
  const rootUrl = `${request.protocol}://${request.get('host')}`
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
          <td><a href=${rootUrl}/api/persons>/api/persons</a></td>
          <td>All people</td>
        </tr>
        <tr>
          <td><a href=${rootUrl}/api/persons/1>/api/persons/{id}</a></td>
          <td>Search by person's id</td>
        </tr>
      </tbody>
    </table>
  `);
});

app.get('/api/persons', (request, response, next) => {
  Person
    .find({})
    .then((persons) => response.json(persons))
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  const targetId = request.params.id;
  const targetPerson = persons.find(({ id }) => id === targetId);

  if (targetPerson) {
    response.json(targetPerson);
  } else {
    response.status(404).end('Resource not found');
  }
});

app.delete('/api/persons/:id', (request, response, next) => {
  const targetId = request.params.id;
  Person
    .findByIdAndDelete(targetId)
    .then((person) => response.status(204).end())
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const newPerson = new Person(request.body);

  if (!newPerson.name) {
    response.status(400).end('Name is missing');
    return;
  }
  if (!newPerson.number) {
    response.status(400).end('Number is missing');
    return;
  }

  Person
    .find({ name: newPerson.name })
    .then((persons) => {
      if (persons.length) {
        response.status(400).end(`${newPerson.name} already has an entry`);
      } else {
        newPerson
          .save()
          .then((savedPerson) => response.status(201).json(savedPerson));
      }
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    response.status(400).send('Failed to query database by ID - Invalid MongoDB ObjectId string');
    return;
  }
  
  // Forward error to default Express error handler
  next(error);
}

app.use(errorHandler);

// For non-production environments, start server on specified local port
if (process.env.NODE_ENV !== 'production') {
  app.listen(LOCAL_PORT, () => console.log(`Server running at http://localhost:${LOCAL_PORT}`));
}

// Export app for use in serverless environments (e.g., Vercel)
module.exports = app;
