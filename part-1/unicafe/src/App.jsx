import { useState } from 'react';


const App = () => {
  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);

  return (
    <div>
      <GiveFeedback 
        good={good} setGood={setGood} 
        neutral={neutral} setNeutral={setNeutral} 
        bad={bad} setBad={setBad} 
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};


const GiveFeedback = ({
  good, setGood, 
  neutral, setNeutral, 
  bad, setBad,
}) => (
  <>
    <h1>give feedback</h1>
    <button onClick={() => setGood(good + 1)}>good</button>
    <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
    <button onClick={() => setBad(bad + 1)}>bad</button>
  </>
);


const Statistics = ({ good, neutral, bad }) => (
  <>
    <h1>statistics</h1>
    <p>
        good {good}<br />
        neutral {neutral}<br />
        bad {bad}
    </p>
  </>
);


export default App;
