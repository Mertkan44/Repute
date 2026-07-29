'use client'
import { useEffect, useRef, useState } from 'react'

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.12)
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.12)
      setPosition({ x: currentRef.current.x, y: currentRef.current.y })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return position
}
