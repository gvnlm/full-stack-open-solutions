const NumberForm = ({ 
  name, 
  handleNameChange, 
  number, 
  handleNumberChange, 
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="name">name: </label>
      <input id="name" type="text" value={name} onChange={handleNameChange} />
    </div>
    <div>
      <label htmlFor="number">number: </label>
      <input id="number" type="tel" value={number} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default NumberForm;
