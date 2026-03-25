import { useEffect, useRef, useState } from "react"
import { getTimeDiffernceFromNow } from "../utils"

interface TimerProps {
  completed: boolean
}

export default function Timer({ completed }: TimerProps) {
  const [timer, setTimer] = useState("00:00:00")
  const initialTime = useRef(new Date().getTime())

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined

    if (!completed) {
      intervalId = setInterval(() => {
        const timeDiff = getTimeDiffernceFromNow(initialTime.current)
        setTimer(timeDiff)
      }, 1000)
    }

    return () => clearInterval(intervalId)
  }, [completed])

  return <div id="timer">{timer}</div>
}
