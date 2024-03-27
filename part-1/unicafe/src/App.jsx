import { useState } from 'react'

const Header = ({ text }) => (
  <h1>{text}</h1>
) 

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => (
  <>
    <td>{text}</td>
    <td>{value}</td>
  </>
)

const Statistics = ({ good, neutral, bad }) => {
  if (good == 0 && neutral == 0 && bad == 0) {
    return (
    <>
      <Header text="Statistics" />
      <p>No feedback given</p>
    </>
    )
  }

  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = `${good / total * 100}%`;

  return (
    <>
      <Header text="Statistics" />

      <table>
        <tbody>
          <tr><StatisticLine text="Good" value={good} /></tr>
          <tr><StatisticLine text="Neutral" value={neutral} /></tr>
          <tr><StatisticLine text="Bad" value={bad} /></tr>

          <tr><StatisticLine text="Total" value={total} /></tr>
          <tr><StatisticLine text="Average" value={average} /></tr>
          <tr><StatisticLine text="Positive" value={positive} /></tr>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text="Give feedback" />

      <Button text="Good" onClick={() => setGood(good + 1)} />
      <Button text="Neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="Bad" onClick={() => setBad(bad + 1)} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;
