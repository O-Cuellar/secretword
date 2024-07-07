//Mini Game de tentar adivinhar uma palavra de um tema especifico que está pré definida em um conceito primitivo de base de dados, cada palavra tem um tema a qual é subordinada e a cada vez que o jogo é iniciado ou reiniciado uma palavra aleatoria de um tema aleatorio é selecionada pelo programa, o usuario deve tentar acertar a palavra com base em suas letras através do "chute" de uma letra, o programa então faz a relação entre a letra e a palavra e é atualizada no template, se não errar a letra correspondente a palavra então as tentativas se mantem, max de 3 erros, e ao acertar-se ou errar a palavra deve se mostrar uma pontuação e dar a opção de recomeçar o jogo

//DATA
import { wordsList } from './data/Words';
//CSS
import './App.css'
//HOOKS
import { useState } from 'react';
import StartScreen from './components/startScreen';
import InGame from './components/inGame';
import EndGame from './components/endGame';

const stages = [
  {id: 1, name: "Start"},
  {id: 2, name: "Game"},
  {id: 3, name: "End"}
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedCategory, setPickedCategory] = useState("");
  const [pickedWord, setPickedWord] = useState("");
  const [letters, setLetters] = useState([]);
  const [wrongLettters, setWrongLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [points, setPoints] = useState(0);

  const pickWordAndCategory = () =>{
    //pick a random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(words).length)];
    // pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    return {word, category};
  }
  
  const verifyLetter = (letter) =>{
    console.log(letter);
  }

  const startGame = () =>{
    const {word, category} = pickWordAndCategory();
    // definindo um array de letras da categoria e palavra selecionadas
    let letters = word.split("");
    letters = letters.map((l) => l.toLowerCase());
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(letters);
    setGameStage(stages[1].name);
  }

  const Over = () =>{
    setGameStage(stages[2].name);
  }

  return (
    <>
      <div>
        {gameStage === "Start" && <StartScreen startGame={startGame}/>}
        {gameStage === "Game" && <InGame 
        verifyLetter={verifyLetter}
        Over={Over}
        pickedWord={pickedWord} 
        pickedCategory={pickedCategory}
        letters={letters}
        wrongLettters={wrongLettters}
        points={points}
        guesses={guesses}
        guessedLetters={guessedLetters} />}
        {gameStage === "End" && <EndGame />}
      </div>
    </>
  )
}

export default App;