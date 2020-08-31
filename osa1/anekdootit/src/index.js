import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const points = new Array(anecdotes.length).fill(0) //initialize array --> points[0, 0, 0, 0, 0, 0]

const Button = ({ text, onClick}) => (
  <button onClick={onClick}>{text}</button> 
)

//Print votes for most voted anecdote 
const Votes = ({ votes }) => {
  return <p>has {votes} votes</p>
}

//Return most voted anecdote. Informs user if no votes haven't been given.
const MostVotedAnecdote = ({ votes, anecdotes, mostVotesIndex}) => {
  if (votes === 0) {
    return <p>None of the anecdotes got any vote...</p>
  }
  return (
    <div> 
      <b>{anecdotes[mostVotesIndex]}</b>
      <Votes votes={votes} />
    </div>
  )
}

const App = ({ anecdotes }) => {
  const [selected, setSelected] =  useState(0)
  const [votes, setVotes] = useState(0)
  const [mostVotes, setMostVotes] = useState(0)
  const [mostVotesIndex, setMostVotesIndex] = useState(0)

  //Generate random next anecdote from anecdotes
  const nextAnecdote = () => {
    const drawNext = Math.floor(Math.random() * anecdotes.length)
    setSelected(drawNext)
    setVotes(points[drawNext])
  }
  //Add vote for anecdote
  const voteAnecdote = () => {
    points[selected] += 1
    setVotes(points[selected])
    setMostVotes(Math.max(...points))
    setMostVotesIndex(points.indexOf(Math.max(...points)))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div><b>{anecdotes[selected]}</b></div>
      <Votes votes={votes} />
      <div>
        <Button text='vote' onClick={voteAnecdote} />
        <Button text='next anecdote' onClick={nextAnecdote} />
      </div>
      <h1>Anecdote with most votes</h1>
      <MostVotedAnecdote votes={mostVotes} anecdotes={anecdotes} mostVotesIndex={mostVotesIndex} />
    </div>
  )
}

ReactDOM.render(<App anecdotes={anecdotes} />,document.getElementById('root'));