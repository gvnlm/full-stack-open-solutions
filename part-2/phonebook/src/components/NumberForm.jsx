const NumberForm = ({ name, handleNameChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="name">name: </label>
      <input id="name" type="text" value={name} onChange={handleNameChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default NumberForm;
