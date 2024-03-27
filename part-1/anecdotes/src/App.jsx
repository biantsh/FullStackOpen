import { useState } from 'react'

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
)

const Anecdote = ({ title, text, votes, shouldDisplay }) => {
  if (shouldDisplay) {
    return (
      <>
        <h1>{title}</h1>
        <p>{text}<br />has {votes} votes.</p>
      </>
    )
  }
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
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const handleVote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;

    setVotes(votesCopy);
  }

  const handleNext = () => {
    const randomIndex = Math.floor(Math.random() * 8);
    setSelected(randomIndex);
  }
  
  const mostVoted = votes.indexOf(Math.max(...votes));
  const showMostVoted = votes[mostVoted] > 0;

  return (
    <div>
      <Anecdote title="Anecdote of the day" text={anecdotes[selected]} votes={votes[selected]} shouldDisplay={true} />
      <Button text="Vote" onClick={() => handleVote()} />
      <Button text="Next Anecdote" onClick={() => handleNext()} />
      <Anecdote title="Most voted anecdote" text={anecdotes[mostVoted]} votes={votes[mostVoted]} shouldDisplay={showMostVoted} />
    </div>
  )
}

export default App;
