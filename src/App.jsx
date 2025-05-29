//Mini Game de tentar adivinhar uma palavra de um tema especifico que está pré definida em um conceito primitivo de base de dados, cada palavra tem um tema a qual é subordinada e a cada vez que o jogo é iniciado ou reiniciado uma palavra aleatoria de um tema aleatorio é selecionada pelo programa, o usuario deve tentar acertar a palavra com base em suas letras através do "chute" de uma letra, o programa então faz a relação entre a letra e a palavra e é atualizada no template, se não errar a letra correspondente a palavra então as tentativas se mantem, max de 3 erros, e ao acertar-se ou errar a palavra deve se mostrar uma pontuação e dar a opção de recomeçar o jogo

//DATA
import { wordsList } from "./data/Words";
//CSS
import "./App.css";
//HOOKS
import { useState, useEffect, useCallback } from "react";
import StartScreen from "./components/startScreen";
import InGame from "./components/inGame";
import EndGame from "./components/endGame";

const stages = [
  { id: 1, name: "Start" },
  { id: 2, name: "Game" },
  { id: 3, name: "End" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedCategory, setPickedCategory] = useState("");
  const [pickedWord, setPickedWord] = useState("");
  const [letters, setLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [points, setPoints] = useState(0);

  const pickWordAndCategory = () => {
    //pick a random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(words).length)];
    // pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
    return { word, category };
  };

  const verifyLetter = (letter) => {
    const LowerCaseLetter = letter.toLowerCase();

    if (
      guessedLetters.includes(LowerCaseLetter) ||
      wrongLetters.includes(LowerCaseLetter)
    ) {
      return;
    }

    if (letters.includes(LowerCaseLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        LowerCaseLetter,
      ]);
      setPoints((actualPoints) => actualPoints + 10); // 10 pontos por letra certa
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        LowerCaseLetter,
      ]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const ClearStates = () => {
    setGuesses(3);
    setWrongLetters([]);
    setGuessedLetters([]);
  };

  useEffect(() => {
    if (guesses <= 0) {
      setGameStage(stages[2].name);
      ClearStates();
    }
  }, [guesses]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const uniqueLetters = [...new Set(letters)];

    if (
      uniqueLetters.length > 0 &&
      guessedLetters.length === uniqueLetters.length
    ) {
      startGame();
    }
  }, [guessedLetters, letters]);

  const startGame = useCallback(() => {
    ClearStates();
    const { word, category } = pickWordAndCategory();
    // definindo um array de letras da categoria e palavra selecionadas
    let letters = word.split("");
    letters = letters.map((l) => l.toLowerCase());
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(letters);
    setGameStage(stages[1].name);
    setIsPlaying(true);
  });

  const restart = () => {
    setGameStage(stages[0].name);
    setPoints(0);
    setIsPlaying(false);
  };

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <div>
        {gameStage === "Start" && <StartScreen startGame={startGame} />}
        {gameStage === "Game" && (
          <InGame
            verifyLetter={verifyLetter}
            pickedWord={pickedWord}
            pickedCategory={pickedCategory}
            letters={letters}
            wrongLetters={wrongLetters}
            points={points}
            guesses={guesses}
            guessedLetters={guessedLetters}
          />
        )}
        {gameStage === "End" && <EndGame restart={restart} points={points} />}
      </div>
    </>
  );
}

export default App;
