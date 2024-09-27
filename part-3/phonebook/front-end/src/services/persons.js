import axios from 'axios';

const BASE_URL = 'https://phonebook-back-end.vercel.app/api/persons';

const getAll = () => (
  axios
    .get(BASE_URL)
    .then((response) => response.data)
);

const add = (person) => (
  axios
    .post(BASE_URL, person)
    .then((response) => response.data)
);

const remove = (id) => axios.delete(`${BASE_URL}/${id}`);

const edit = (id, editedProperties) => (
  axios
    .patch(`${BASE_URL}/${id}`, editedProperties)
    .then((response) => response.data)
);

export default { 
  getAll, 
  add,
  remove,
  edit,
};
