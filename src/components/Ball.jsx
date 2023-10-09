import {RigidBody} from "@react-three/rapier";
import {useGLTF} from "@react-three/drei";
import {useEffect, useRef} from "react";
import sound from "../../public/sounds/ball-hit.mp3";
import {useStore} from "zustand";
import gameStore from "../store.js";

export default function Ball() {
    const {gameState} = gameStore()

    const ballModel = useGLTF('/models/ball.glb')
    const ball = useRef();
    useEffect(() => {
        if(gameState === "gameOver") {
            ball.current.setBodyType(1)
        } else {
            ball.current.setBodyType(0)
        }
    }, []);
    const hit = () => {
        // play hit sound
        const audio = new Audio(sound)
        audio.play()
    }
    return (
        <RigidBody ref={ball} colliders="ball" restitution={1} type="dynamic" gravityScale={1.15} onCollisionEnter={() => hit()}>
            <primitive object={ballModel.scene} position={[0, 1, 0]} scale={0.15}  />
        </RigidBody>
    )
}