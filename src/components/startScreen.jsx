import './startScreen.css'

const StartScreen = ( { startGame } ) => {
  return (
    <div>
      <h1 className="title">Secret Word</h1>
      <p className='sinopse'>Clique no botão abaixo para iniciar</p>
      <button onClick={startGame}>Start!</button>
    </div>
  )
}

export default StartScreen;