import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

function App() {
  const cardImages = [
    { src: '/img/helmet-1.png', matched: false },
    { src: '/img/potion-1.png', matched: false },
    { src: '/img/ring-1.png', matched: false },
    { src: '/img/scroll-1.png', matched: false },
    { src: '/img/shield-1.png', matched: false },
    { src: '/img/sword-1.png', matched: false },
  ]

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            }
            return card
          })
        })
        resetTurns()
      } else {
        setTimeout(resetTurns, 800)
      }
    }
  }, [choiceOne, choiceTwo])


  const resetTurns = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(preTurns => preTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <p>Turns: {turns}</p>
      <div className="card-grid">
        {cards.map(card => <SingleCard
          card={card} key={card.id}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
        />)}
      </div>
    </div>
  );
}

export default App