import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import GameUI from "./components/GameUI.jsx";
import {create} from "zustand";

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        shadows
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ 0, 2, 6 ]
        } }
    >
        <Experience />
        <GameUI />
    </Canvas>
)