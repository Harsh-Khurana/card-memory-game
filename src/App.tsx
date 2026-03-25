import { useCallback, useState } from "react"

import "./App.css"
import Home from "./components/Home"
import Game from "./components/Game"

// 2 -> easy, 4 -> medium, 6 -> hard
export type Level = 2 | 4 | 6

export type Stats = {
  easy: string
  medium: string
  hard: string
}

function App() {
  const [level, setLevel] = useState<Level>(2)
  const [isPlaying, setIsPlaying] = useState(false)
  const [stats, setStats] = useState({ easy: "-", medium: "-", hard: "-" })

  function handleLevelChange(newLevel: Level) {
    setLevel(newLevel)
  }

  const handleSaveStat = useCallback((level: Level, time: string) => {
    setStats(prevStats => {
      if (level === 2) {
        return { ...prevStats, easy: time }
      } else if (level === 4) {
        return { ...prevStats, medium: time }
      } else {
        return { ...prevStats, hard: time }
      }
    })
  }, [])

  return (
    <>
      {isPlaying ? (
        <Game level={level} onExit={() => setIsPlaying(false)} onComplete={handleSaveStat} />
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
