import {create} from "zustand";

const gameStore = create(set => ({
    gameState: "gameOver",
    setGameState: (gameState) => set({gameState}),
    score: 0,
    setScore: () => set(state => ({score: state.score + 1})),
    resetScore: () => set({score: 0}),
}))

export default gameStore