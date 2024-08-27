import {CuboidCollider, RigidBody, quat} from "@react-three/rapier";
import {useGLTF} from "@react-three/drei";
import {useFrame, useThree} from "@react-three/fiber";
import {useRef} from "react";
import gameStore from "../store.js";
import {Euler, Quaternion} from "three";

export default function Racket() {
    const racketModel = useGLTF('/models/racket.glb')
    const racket = useRef();
    const { viewport } = useThree()
    const {gameState, setScore} = gameStore()

    useFrame(({mouse, clock}) => {
        const x = (mouse.x * viewport.width) / 2
        const y = (mouse.y * viewport.height) / 2
        const quaternion = quat(racket.current?.rotation());
        if(gameState === "gameOver") {
            racket.current?.setNextKinematicTranslation({x: 0 , y: 0 , z:0})
        } else {
            const eulerRotation = new Euler(0, 0, x / viewport.width * 1.2);
            const quaternion = new Quaternion();
            quaternion.setFromEuler(eulerRotation);
            racket.current?.setNextKinematicRotation(quaternion);
            racket.current?.setNextKinematicTranslation({x: x , y: y < 1.5 ? y > -1.5 ? y : -1.5 : 1.5 , z:0})
        }
    })
    return (
        <RigidBody onCollisionEnter={() => setScore()} ref={racket}  type="kinematicPosition" colliders={false} rotation={[0, 0, 0]}>
            <CuboidCollider args={[.5, .1, .5] } position={[0, -.05, -.3]} />
            <CuboidCollider args={[.12, .035, .28] } position={[0, 0, .48]} />
            <primitive object={racketModel.scene} scale={0.5} />
        </RigidBody>
    )
}