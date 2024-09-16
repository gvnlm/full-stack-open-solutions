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
    <Button handleClick={() => setGood(good + 1)} text='good' />
    <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
    <Button handleClick={() => setBad(bad + 1)} text='bad' />
  </>
);


const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  if (all === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    );
  }
  
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  return (
    <>
      <h1>statistics</h1>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={all} />
      <StatisticLine text='average' value={average.toFixed(2)} />
      <StatisticLine text='positive' value={positive.toFixed(2)} />
    </>
  );
};


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);


const StatisticLine = ({ text, value }) => <>{text} {value}<br /></>;


export default App;
