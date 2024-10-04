// Regex for Australian mobile and landline phone numbers
const PHONE_REGEX = /^(\+61|0)[23478]([- ]?\d){8}$/;

// Imports
require('dotenv').config();
const mongoose = require('mongoose');

// Establish connection with the database
console.log('Establishing connection with MongoDB...');
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => console.log('Successfully connected to MongoDB'))
  .catch((error) => console.log(`Failed to connect to MongoDB: ${error.message}`));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: (string) => PHONE_REGEX.test(string),
      message: (props) => `${props.value} is not a valid Australian phone number`
    },
  },
});

personSchema.set('toJSON', {
  transform: (document, person) => {
    person.id = person._id.toString();
    delete person._id;
    delete person.__v;
  }
});

// Person model - Corresponds to the "people" collection in the database
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
