import { Html } from "@react-three/drei";
import {gameStore} from "../index.jsx";

export default function GameUI() {
    const {gameState, setGameState} = gameStore();
    console.log(gameState)
    return (
        <>
        {
                gameState === "gameOver" &&
        (<Html wrapperClass="game-ui">
            <div className="elements">
                <h1>Ping pong ball game</h1>
                    <p>Move the mouse to control the pedal <br />
                    There is no rules, just play until you drop the ball</p>
                <button onClick={() => setGameState("playing")}>Start</button>
            </div>
        </Html>)
            }
        </>
    )
}