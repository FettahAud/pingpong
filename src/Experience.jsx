import {Physics, RigidBody} from "@react-three/rapier";
import Ball from "./components/Ball.jsx";
import Racket from "./components/racket.jsx";
import gameStore from "./store.js";
import OuterCollider from "./components/OuterCollider.jsx";
import {Text} from "@react-three/drei";

export default function Experience()
{
    const {gameState, score} = gameStore()

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
        {gameState === "playing" && <Text position={[-6, 0, -7.3]} color="black">{score}</Text>}
        <Physics >
            <OuterCollider />
            {gameState && <Racket key={gameState} />}
            {gameState && <Ball key={`${gameState} racket`} />}

        </Physics>
    </>
}