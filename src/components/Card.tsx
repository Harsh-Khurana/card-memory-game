import type { ComponentPropsWithoutRef, ReactNode } from "react"

interface CustomProps {
  show?: boolean
  matched?: boolean
  children: ReactNode
}

type CardProps = CustomProps & ComponentPropsWithoutRef<"div">

export default function Card({ show, matched, children, ...props }: CardProps) {
  const isFlipped = show || matched

  return (
    <div className="flip-card" {...props}>
      <div className={`flip-card-inner${isFlipped ? " flip-active" : ""}`}>
        <div className="flip-card-front flex">Flip me!</div>
        <div className="flip-card-back flex">
          <h2>{children}</h2>
        </div>
      </div>
    </div>
  )
}
