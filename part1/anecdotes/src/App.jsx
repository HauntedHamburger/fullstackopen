import { useState } from 'react'
import './App.css'

const Anecdotes = ({ anecdotes, votes }) => {
  return (
    <div>
      <div>{anecdotes}</div>
      <div>Has {votes} votes</div>
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const MostVoted = ({ anecdotes, votes }) => {
  return (
    <div>
      <div>{anecdotes}</div>
      <div>Has {votes} votes</div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  let array = Array(anecdotes.length).fill(0) 
  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(array)
  
  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }

  const voteAnecdote = () => {
    const copyVotes = [ ...voted ]
    copyVotes[selected] += 1
    setVoted(copyVotes)
  }

  const mostVotes = Math.max(...voted)
  const index = voted.indexOf(mostVotes)

  return (
    <div>
      <Anecdotes anecdotes={anecdotes[selected]} votes={voted[selected]} />
      <Button onClick={nextAnecdote} text='Next Anecdote' />
      <Button onClick={voteAnecdote} text='Vote Anecdote' />
      <MostVoted anecdotes={anecdotes[index]} votes={mostVotes} />
    </div>
    
  )
}


export default App
