import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticsLine = ({text, value}) => (
  <tr><td>{text}</td><td>{value}</td></tr>  //<tr>=table row, <td>=table data
)

const Statistics = ({good, bad, neutral}) => {
  const totalFeedback = good + neutral + bad

  //No feedback
  if (totalFeedback === 0) {
    return <p>No feedback given</p>
  }

  //Positive feedback and average calculation
  const positiveFeedbackPercent = 100.0 * good / totalFeedback + ' %'
  const averageFeedback = ((1 * good) + (-1 * bad)) / totalFeedback

  return (
    <div>
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={totalFeedback} />
        <StatisticsLine text="average" value={averageFeedback} />
        <StatisticsLine text="positive" value={positiveFeedbackPercent} />
      </tbody>
    </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={() => setGood(good + 1)} />
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)} />
      <Button text='bad' handleClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));