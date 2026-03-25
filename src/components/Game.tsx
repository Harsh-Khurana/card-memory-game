import { Fragment, useEffect, useRef, useState } from "react"

import type { Level } from "../App"
import Card from "./Card"
import Modal from "./Modal"
import Timer from "./Timer"
import { generateCardMatrix, getTimeDiffernceFromNow } from "../utils"

interface GameProps {
  level: Level
  onExit: () => void
  onComplete: (level: Level, time: string) => void
}

export default function Game({ level, onExit, onComplete }: GameProps) {
  const [cardMatrix, setCardMatrix] = useState(generateCardMatrix(level))
  const [firstSelectedCard, setFirstSelectedCard] = useState<{ row: number; col: number } | null>(
    null,
  )
  const [matchedCardCount, setMatchedCardCount] = useState(0)
  const isCardCheckExecuting = useRef(false)
  const initialTime = useRef(new Date().getTime())

  useEffect(() => {
    if (matchedCardCount === level * level) {
      const timeDiff = getTimeDiffernceFromNow(initialTime.current)
      onComplete(level, timeDiff)
    }
  }, [level, matchedCardCount, onComplete])

  async function handleCardClick(rowIdx: number, colIdx: number) {
    if (isCardCheckExecuting.current) return

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
        <Timer completed={matchedCardCount === level * level} />
      </header>
      <main
        className={
          "flex " +
          (level === 2 ? "two-col-layout" : level === 4 ? "four-col-layout" : "six-col-layout")
        }
      >
        {cardsLayout}
      </main>
      <Modal isOpen={matchedCardCount === level * level} onClose={onExit}>
        <h2>Congrats!! You found em all.</h2>
        <h1 className="flex">♡⸜(ˆᗜˆ˵ )⸝♡</h1>
        <h2 className="flex heading-high-score">(,,⟡o⟡,,) New high score</h2>
      </Modal>
    </>
  )
}
