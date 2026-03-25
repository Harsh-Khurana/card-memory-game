import { useState } from "react"
import type { Level, Stats } from "../App"
import Modal from "./Modal"

interface HomeProps {
  level: Level
  stats: Stats
  onLevelChange: (newLevel: Level) => void
  onPlay: () => void
}

export default function Home({ level, stats, onLevelChange, onPlay }: HomeProps) {
  const [showStats, setShowStats] = useState(false)

  return (
    <>
      <header>
        <button onClick={() => setShowStats(true)}>Stats</button>
      </header>
      <Modal isOpen={showStats} onClose={() => setShowStats(false)}>
        <h2>Here's your stats:</h2>
        <table>
          <thead>
            <tr>
              <th>Level</th>
              <th>Best time</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(stats).map(([level, time]) => {
              return (
                <tr key={level}>
                  <td>{level}</td>
                  <td>{time}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Modal>
      <main id="home">
        <img src="/cmg-logo.svg" alt="Card Memory Game logo" />
        <h1>Card memory game</h1>
        <div id="instructions">
          <h3>How to Play?</h3>
          <p>
            From the displayed cards facing down, choose any card and try to find the matching card.
            If they are a match, you have won them. Continue till you find all the matching cards in
            minimum time possible. Time is your enemy, let's see how fast you can find them.
          </p>
        </div>
        <div className="flex">
          <label htmlFor="level">Choose your level:</label>
          <select
            name="level"
            id="level"
            value={level}
            onChange={e => onLevelChange(parseInt(e.target.value) as Level)}
          >
            <option value="2">Easy</option>
            <option value="4">Medium</option>
            <option value="6">Hard</option>
          </select>
        </div>
        <button id="play" onClick={onPlay}>
          Play
        </button>
      </main>
    </>
  )
}
