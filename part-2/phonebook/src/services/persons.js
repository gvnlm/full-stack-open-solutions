import axios from 'axios';

const BASE_URL = 'http://localhost:3001/persons';

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

export default { 
  getAll, 
  add,
  remove,
};
