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

app.get('/', (request, response, next) => {
  const rootUrl = `${request.protocol}://${request.get('host')}`
  const requestReceivedAt = new Date();
  response.send(`
    <p>
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
          <td><p>/api/persons/{id}</p></td>
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
  Person
    .findById(targetId)
    .then((person) => {
      if (person) {
        response.status(200).json(person);
      } else {
        response.status(404).end('Resource not found');
      }
    })
    .catch((error) => next(error));
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
  Person
    .find({ name: newPerson.name })
    .then((persons) => {
      if (persons.length) {
        response.status(400).end(`${newPerson.name} already has an entry`);
      } else {
        newPerson
          .save()
          .then((savedPerson) => response.status(201).json(savedPerson))
          .catch((error) => next(error));
      }
    })
    .catch((error) => next(error));
});

app.patch('/api/persons/:id', (request, response, next) => {
  const targetId = request.params.id;
  const updatedProperties = request.body;
  const options = { new: true, runValidators: true, context: 'query' };
  Person
    .findByIdAndUpdate(targetId, updatedProperties, options)
    .then((updatedPerson) => response.status(200).json(updatedPerson))
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    response.status(400).send('Failed to query database by ID - Invalid MongoDB ObjectId string');
    return;
  }

  if (error.name === 'ValidationError') {
    response.status(400).json(error.message);
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
