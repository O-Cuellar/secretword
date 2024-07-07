import { useState } from 'react';
import './inGame.css'


const InGame = ( { Over, pickedWord, pickedCategory, letters, wrongLetters, guesses, points, guessedLetters } ) => {
  const [letter, setLetter] = useState("");

  return (
    <div className="game">
      <p className="point">Pontuação: {points}</p>
      <h1>Adivinhe a palavra: </h1>
      <h3 className="tip">
        A dica é: {pickedCategory}
      </h3>
      <div className="wordContainer">
        {letters.map((letter, i) => (guessedLetters.includes(letter) ? (
          <span key={i} className='letter'>{letter}</span>
        ) : (
          <span key={i} className='blankSquare'></span>
        )
      ))}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <p>Você ainda tem {guesses} tentativas</p>
        <form>
          <input type="text" name="letter" maxLength={1} required />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettters">
        <p>Letras já utlizadas: </p>
        <span>
          {wrongLetters}
        </span>
      </div>
    </div>
  )
}

export default InGame;