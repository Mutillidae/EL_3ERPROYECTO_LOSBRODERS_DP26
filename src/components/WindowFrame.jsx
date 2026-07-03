import { useRef, useState, useEffect } from 'react'

let zCounter = 100

export default function WindowFrame({
  title,
  icon = '🗎',
  onClose,
  width = 500,
  height = 400,
  initialX,
  initialY,
  children,
  resizable = false,
}) {
  const [pos, setPos] = useState({
    x: initialX ?? Math.max(40, (window.innerWidth - width) / 2),
    y: initialY ?? Math.max(40, (window.innerHeight - height) / 3),
  })
  const [z, setZ] = useState(() => ++zCounter)
  const dragRef = useRef(null)
  const frameRef = useRef(null)

  const bringToFront = () => setZ(++zCounter)

  const onMouseDownTitle = (e) => {
    bringToFront()
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: pos.x,
      origY: pos.y,
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  const onMouseMove = (e) => {
    if (!dragRef.current) return
    const dx = e.clientX - dragRef.current.startX
    const dy = e.clientY - dragRef.current.startY
    setPos({
      x: Math.max(0, dragRef.current.origX + dx),
      y: Math.max(0, dragRef.current.origY + dy),
    })
  }

  const onMouseUp = () => {
    dragRef.current = null
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  return (
    <div
      ref={frameRef}
      className="win-frame"
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        width,
        height,
        zIndex: z,
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--panel-bg)',
        border: '1px solid var(--window-border)',
        boxShadow: '3px 4px 14px rgba(0,0,0,0.45)',
        borderRadius: '3px',
        overflow: 'hidden',
      }}
      onMouseDown={bringToFront}
    >
      <div
        className="win-titlebar"
        onMouseDown={onMouseDownTitle}
        style={{ cursor: 'move' }}
      >
        <span className="win-titlebar-text">
          <span>{icon}</span>
          <span>{title}</span>
        </span>
        <span className="win-controls">
          <button
            className="win-close"
            title="Cerrar"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={onClose}
          >
            ✕
          </button>
        </span>
      </div>
      <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
        {children}
      </div>
    </div>
  )
}
