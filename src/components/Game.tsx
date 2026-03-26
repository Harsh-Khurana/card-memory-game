import { Fragment, useRef, useState, useMemo } from "react"

import type { Level } from "../App"
import Card from "./Card"
import Modal from "./Modal"
import Timer from "./Timer"
import { generateCardMatrix, getTimeDiffernceFromNowInMs } from "../utils"

interface GameProps {
  level: Level
  curLevelStat?: number
  onExit: () => void
  onComplete: (level: Level, time: number) => void
}

export default function Game({ level, curLevelStat, onExit, onComplete }: GameProps) {
  const gameStrength = useMemo(() => (level === "easy" ? 2 : level === "medium" ? 4 : 6), [level])
  const [cardMatrix, setCardMatrix] = useState(generateCardMatrix(gameStrength))
  const [firstSelectedCard, setFirstSelectedCard] = useState<{ row: number; col: number } | null>(
    null,
  )
  const [matchedCardCount, setMatchedCardCount] = useState(0)
  const [isHighScore, setIsHighScore] = useState(false)

  const isCardCheckExecuting = useRef(false)
  const initialTime = useRef(new Date().getTime())

  async function handleCardClick(rowIdx: number, colIdx: number) {
    if (isCardCheckExecuting.current) return

    // Maintaining a local matched card count since after game finishes the state update to
    // matchedCardCount happens at a later point since react will batch it. But we are already
    // checking if game finished executing at the end
    let localMatchedCardCount = matchedCardCount

    if (firstSelectedCard) {
      isCardCheckExecuting.current = true
    }

    setCardMatrix(oldCardMatrix => {
      const newCardMatrix = oldCardMatrix.map(cardRow => [...cardRow])
      newCardMatrix[rowIdx][colIdx].show = true
      return newCardMatrix
    })

    if (firstSelectedCard) {
      const { row, col } = firstSelectedCard
      if (cardMatrix[rowIdx][colIdx].content === cardMatrix[row][col].content) {
        setCardMatrix(oldCardMatrix => {
          const newCardMatrix = oldCardMatrix.map(cardRow => [...cardRow])
          newCardMatrix[rowIdx][colIdx].matched = true
          newCardMatrix[row][col].matched = true
          return newCardMatrix
        })
        setMatchedCardCount(prevCount => prevCount + 2)
        localMatchedCardCount += 2
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setCardMatrix(oldCardMatrix => {
          const newCardMatrix = oldCardMatrix.map(cardRow => [...cardRow])
          newCardMatrix[rowIdx][colIdx].show = false
          newCardMatrix[row][col].show = false
          return newCardMatrix
        })
      }
      setFirstSelectedCard(null)
    } else {
      setFirstSelectedCard({ row: rowIdx, col: colIdx })
    }
    isCardCheckExecuting.current = false

    // IF GAME FINISHED
    if (localMatchedCardCount === gameStrength * gameStrength) {
      const msDiff = getTimeDiffernceFromNowInMs(initialTime.current)
      if (!curLevelStat || curLevelStat - msDiff > 0) {
        setIsHighScore(true)
        onComplete(level, msDiff)
      }
    }
  }

  const cardsLayout = cardMatrix.map((cardRow, i) => {
    return (
      <Fragment key={i}>
        {cardRow.map((card, j) => (
          <Card
            key={`${i}-${j}`}
            show={card.show}
            matched={card.matched}
            onClick={() => handleCardClick(i, j)}
          >
            {card.content}
          </Card>
        ))}
      </Fragment>
    )
  })

  return (
    <>
      <header>
        <button onClick={onExit}>&lt; Go back to main menu</button>
        <Timer completed={matchedCardCount === gameStrength * gameStrength} />
      </header>
      <main
        className={
          "flex " +
          (level === "easy"
            ? "two-col-layout"
            : level === "medium"
              ? "four-col-layout"
              : "six-col-layout")
        }
      >
        {cardsLayout}
      </main>
      <Modal isOpen={matchedCardCount === gameStrength * gameStrength} onClose={onExit}>
        <h2>Congrats!! You found em all.</h2>
        <h1 className="flex">
          <span className="heart">♡</span>
          <span className="hand">⸜</span>(ˆᗜˆ˵ )<span className="hand">⸝</span>
          <span className="heart">♡</span>
        </h1>
        {isHighScore && <h2 className="flex heading-high-score">And a new high score</h2>}
      </Modal>
    </>
  )
}
