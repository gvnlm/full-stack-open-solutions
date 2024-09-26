const PORT = 3001;

// Imports
const express = require('express');

// Set up Express application
const app = express();
app.use(express.json());

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

app.get('/info', (request, response) => {
  const requestReceivedAt = new Date();
  response.send(`
    <p>
      Phonebook has info for ${persons.length} people<br/>
      ${requestReceivedAt}
    </p>
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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
