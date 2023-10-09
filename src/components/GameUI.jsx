import { Html } from "@react-three/drei";
import gameStore from "../store.js";

export default function GameUI() {
    const {gameState, setGameState, resetScore, score} = gameStore();
    const newGame = () => {
        setGameState("playing")
        resetScore()
    }
    return (
        <>
        {
            gameState === "gameOver" &&
            (<Html wrapperClass="game-ui">
                <div className="elements">
                    {score > 0 && <h2>You scored: {score}</h2>}
                    <h1>Ping pong ball game</h1>
                    <p>Move the mouse to control the pedal <br />
                    There is no rules, just play until you drop the ball</p>
                    <button onClick={() => newGame()}>Start</button>
                </div>
            </Html>)
        }
        </>
    )
}