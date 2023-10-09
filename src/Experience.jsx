import {Physics, RigidBody} from "@react-three/rapier";
import Ball from "./components/Ball.jsx";
import Racket from "./components/racket.jsx";
import {gameStore} from "./index.jsx";
import OuterCollider from "./components/OuterCollider.jsx";

export default function Experience()
{
    const {gameState, setGameState} = gameStore()

    return <>
        {/*lights*/}
        <ambientLight intensity={0.3} />
        <directionalLight
            castShadow
            position={[10, 10, 5]}
            intensity={1.5}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            />
        <spotLight
            castShadow
            position={[1000, 1000, 0]}
            intensity={1.5}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            />
        <Physics >
            <OuterCollider />
            {gameState && <Racket key={gameState} />}
            {gameState && <Ball key={`${gameState} racket`} />}

        </Physics>
    </>
}