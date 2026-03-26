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

const localStoredStats = localStorage.getItem("cmg-stats")
let storedStats: Stats = {}

if (localStoredStats) {
  storedStats = JSON.parse(localStoredStats)
}

storedStats = { easy: undefined, medium: undefined, hard: undefined, ...storedStats }

function App() {
  const [level, setLevel] = useState<Level>("easy")
  const [isPlaying, setIsPlaying] = useState(false)
  const [stats, setStats] = useState<Stats>(storedStats as Stats)

  function handleLevelChange(newLevel: Level) {
    setLevel(newLevel)
  }

  const handleSaveStat = useCallback((level: Level, time: number) => {
    setStats(prevStats => {
      const newStats = { ...prevStats, [level]: time }
      localStorage.setItem("cmg-stats", JSON.stringify(newStats))
      return newStats
    })
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
