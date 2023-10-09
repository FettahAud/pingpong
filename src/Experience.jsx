import sound from '../public/sounds/ball-hit.mp3'

import {Environment, OrbitControls, useGLTF} from '@react-three/drei'
import {useFrame, useThree} from "@react-three/fiber";
import { Perf } from 'r3f-perf'
import {CuboidCollider, Physics, RigidBody} from "@react-three/rapier";
import {useRef} from "react";

export default function Experience()
{
    const racketModel = useGLTF('/models/racket.glb')
    const ballModel = useGLTF('/models/ball.glb')
    const { viewport } = useThree()
    const racket = useRef();
    const ball = useRef();

    const hit = () => {
        // play hit sound
        const audio = new Audio(sound)
        audio.play()
    }
    const loose = () => {
        ball.current?.setTranslation({x: 0, y: 0, z: 0})
        ball.current?.setRotation({x: 0, y: 0, z: 0})
        ball.current.setBodyType(1)
        // console.log(ball.current.bodyType())
    }
    useFrame(({mouse}) => {
        const x = (mouse.x * viewport.width) / 2
        const y = (mouse.y * viewport.height) / 2
        racket.current?.setNextKinematicTranslation({x: x , y: y < 1.5 ? y > -1.5 ? y : -1.5 : 1.5 , z:0})
        // get ball positions using react-three-rapier


        // ball.current
        // racket.current ? racket.current.position.set(x, 0, 0) : null
    })
    return <>
        <OrbitControls makeDefault />

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

        <Physics debug>
            <RigidBody onCollisionEnter={() => loose()} type="kinematicPosition">
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

            <RigidBody ref={racket}  type="kinematicPosition" colliders={false}>
                <CuboidCollider args={[.5, .1, .5] } position={[0, -.05, -.3]} />
                <CuboidCollider args={[.12, .035, .28] } position={[0, 0, .48]} />
                <primitive object={racketModel.scene} scale={0.5} />
            </RigidBody>

            <RigidBody ref={ball} colliders="ball" restitution={1} type="dynamic" gravityScale={1.15} onCollisionEnter={() => hit()}>
                <primitive object={ballModel.scene} position={[0, 1, 0]} scale={0.15}  />
            </RigidBody>
        </Physics>
    </>
}