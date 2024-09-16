import { useState } from 'react';


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  // State
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint16Array(anecdotes.length));

  // Event handlers
  const changeSelected = () => setSelected(getRandomIndex(anecdotes));
  const voteSelected = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
  };

  const anecdoteWithMostVotes = anecdotes[getIndexOfMaxValue(votes)];
  const mostVotes = votes[getIndexOfMaxValue(votes)];

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br />
      has {votes[selected]} votes<br />
      <button onClick={voteSelected}>vote</button>
      <button onClick={changeSelected}>next anecdote</button>

      <h1>Anecdote with the most votes</h1>
      {anecdoteWithMostVotes}<br />
      with {mostVotes} votes
    </div>
  );
};


const getRandomIndex = (array) => Math.floor(Math.random() * array.length);


const getIndexOfMaxValue = (array) => 
  array.reduce(
    (indexOfMaxValue, currentValue, currentIndex) => (
      (currentValue > array[indexOfMaxValue]) ? currentIndex : indexOfMaxValue
    ), 
    0
  );


export default App;
