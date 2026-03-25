import { useEffect, useRef, type ReactNode } from "react"
import { createPortal } from "react-dom"

interface ModalProps {
  isOpen?: boolean
  onClose?: () => void
  children: ReactNode
}

export default function Modal({ isOpen = false, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const modal = dialogRef.current

    if (isOpen) {
      modal?.showModal()
    } else {
      modal?.close()
    }

    return () => modal?.close()
  }, [isOpen])

  return createPortal(
    <dialog ref={dialogRef} onClose={onClose}>
      {children}
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")!,
  )
}
