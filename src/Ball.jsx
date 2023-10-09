import {RigidBody} from "@react-three/rapier";
import {useGLTF} from "@react-three/drei";
import {useEffect, useRef} from "react";
import sound from "../public/sounds/ball-hit.mp3";

export default function Ball() {
    const ballModel = useGLTF('/models/ball.glb')
    const ball = useRef();
    useEffect(() => {
        console.log('rendered')
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