import { useState, useRef } from 'react';
import './inGame.css'


const InGame = ( { pickedWord, pickedCategory, letters, wrongLetters, guesses, points, guessedLetters, verifyLetter } ) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) =>{
    e.preventDefault();
    letterInputRef.current.focus();
    verifyLetter(letter);
    setLetter('');
  }

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
        <form onSubmit={handleSubmit}>
          <input
          type="text"
          name="letter"
          maxLength={1}
          value={letter}
          required
          ref={letterInputRef}
          onChange={(e) => setLetter(e.target.value)}/>
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettters">
        <p>Letras já utlizadas: </p>
        <span>
          {wrongLetters.join(', ')}
        </span>
      </div>
    </div>
  )
}

export default InGame;