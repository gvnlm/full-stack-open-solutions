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


const Statistics = ({ good, neutral, bad }) => (
  <>
    <h1>statistics</h1>
    <StatisticsTable good={good} neutral={neutral} bad={bad} />
  </>
);


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);


const StatisticsTable = ({ good, bad, neutral }) => {
  const all = good + neutral + bad;

  if (all === 0) return <p>No feedback given</p>;

  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  return (
    <table>
      <tbody>
        <tr>
          <th>good</th>
          <td>{good}</td>
        </tr>
        <tr>
          <th>neutral</th>
          <td>{neutral}</td>
        </tr>
        <tr>
          <th>bad</th>
          <td>{bad}</td>
        </tr>
        <tr>
          <th>all</th>
          <td>{all}</td>
        </tr>
        <tr>
          <th>average</th>
          <td>{average.toFixed(2)}</td>
        </tr>
        <tr>
          <th>positive</th>
          <td>{positive.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  );
};


export default App;
