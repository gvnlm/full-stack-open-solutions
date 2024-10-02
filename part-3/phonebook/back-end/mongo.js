const DATABASE_NAME = 'phonebookApp';

// Import Mongoose
const mongoose = require('mongoose');

const database_password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

if (!database_password) {
  console.log('Give database password as first argument');
  process.exit(1);
}

const uri = `mongodb+srv://gvnlm:${database_password}@cluster0.kdp9a.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

// Establish connection with the database
mongoose.set('strictQuery', false);
mongoose.connect(uri);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// Person model - Corresponds to the "people" collection in the database
const Person = mongoose.model('Person', personSchema);

// If the database password is the only parameter given to the program
if (!name && !number) {
  // Display all entries in the "people" collection
  console.log('phonebook:');
  Person
    .find({})
    .then(persons => {
      persons.forEach(({ name, number }) => console.log(`${name} ${number}`));
      mongoose.connection.close();
    });
} else {
  // Add new person to the database
  if (!name) {
    console.log('Give name as second argument');
    process.exit(1);
  }

  if (!number) {
    console.log('Give number as third argument');
    process.exit(1);
  }

  const person = new Person({
    name,
    number,
  });

  person
    .save()
    .then(result => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    });
}
