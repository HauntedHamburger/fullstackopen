import { useState } from 'react'
import './App.css'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  if (text === 'Positive') {
    return (
    <tr>
      <td>{text}</td>
      <td>{value}%</td>
    </tr>
    )
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, bad, neutral, allClicks, positive }) => {
  if (allClicks === 0) {
    return (
      <p>Nothing to report yet, boss.</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='Good' value={good} />
        <StatisticLine text='Bad' value={bad} />
        <StatisticLine text='Neutral' value={neutral} />
        <StatisticLine text='All' value={allClicks} />
        <StatisticLine text='Average' value={(good+bad-neutral)/allClicks} />
        <StatisticLine text='Positive' value={(positive/allClicks*100)} />
      </tbody>
    </table>
  )
}

const App = () => {
const [good, setGood] = useState(0)
const [bad, setBad] = useState(0)
const [neutral, setNeutral] = useState(0)
const [allClicks, setAll] = useState(0)
const [positive, setPositive] = useState(0)

const handleGood = () => {
  setGood(good + 1)
  setAll(allClicks + 1)
  setPositive(positive + 1)
}

const handleBad = () => {
  setBad(bad + 1)
  setAll(allClicks + 1)
}

const handleNeutral = () => {
  setNeutral(neutral + 1)
  setAll(allClicks + 1)
}



  return (
    <div>
      <h2>Give Feedback</h2>
      <Button onClick={handleGood} text='Good' />
      <Button onClick={handleNeutral} text='Neutral' />
      <Button onClick={handleBad} text='Bad' />
      
      <h2>Statistics</h2>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        allClicks={allClicks}
        positive={positive}
      />
    </div>
  )
}

export default App
