import {RigidBody} from "@react-three/rapier";
import {gameStore} from "../index.jsx";

export default function OuterCollider() {
    const {setGameState} = gameStore()
    return (
        <RigidBody onCollisionEnter={() => setGameState("gameOver")} type="kinematicPosition">
            <mesh position={[0, 0 , -7.5]}>
                <planeGeometry args={[15, 10]} />
                <meshStandardMaterial color="white" />
            </mesh>
            <mesh visible={false} position={[0, 0 , 7.5]}>
                <planeGeometry args={[15, 10]} />
                <meshStandardMaterial color="white" />
            </mesh>
            <mesh position={[-7.5, 0 , 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[15, 10]} />
                <meshStandardMaterial color="white" />
            </mesh>
            <mesh position={[7.5, 0 , 0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[15, 10]} />
                <meshStandardMaterial color="white" />
            </mesh>
            <mesh position={[0, -5, 0]} rotation={[ -Math.PI / 2 ,0, 0]}>
                <boxGeometry args={[15, 15, 2]} />
                <meshStandardMaterial color="white" />
            </mesh>
        </RigidBody>
    )
}