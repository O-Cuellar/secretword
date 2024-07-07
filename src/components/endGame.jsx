import './endGame.css'

const EndGame = ( { points, restart } ) => {
  return (
    <div>
      <h1 className='GameOver'>GAME OVER</h1>
      <h3>Sua pontuação foi: {points}</h3>
      <button onClick={restart}>Recomeçar</button>
    </div>
  )
}

export default EndGame;