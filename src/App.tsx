import { useCallback, useState } from "react"

import "./App.css"
import Home from "./components/Home"
import Game from "./components/Game"

export type Level = "easy" | "medium" | "hard"

export type Stats = {
  easy?: number
  medium?: number
  hard?: number
}

function App() {
  const [level, setLevel] = useState<Level>("easy")
  const [isPlaying, setIsPlaying] = useState(false)
  const [stats, setStats] = useState<Stats>({ easy: undefined, medium: undefined, hard: undefined })

  function handleLevelChange(newLevel: Level) {
    setLevel(newLevel)
  }

  const handleSaveStat = useCallback((level: Level, time: number) => {
    setStats(prevStats => ({ ...prevStats, [level]: time }))
  }, [])

  return (
    <>
      {isPlaying ? (
        <Game
          level={level}
          curLevelStat={stats[level]}
          onExit={() => setIsPlaying(false)}
          onComplete={handleSaveStat}
        />
      ) : (
        <Home
          level={level}
          stats={stats}
          onLevelChange={handleLevelChange}
          onPlay={() => setIsPlaying(true)}
        />
      )}
    </>
  )
}

export default App
