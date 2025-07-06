"use client"

import type React from "react"
import { useRef, useState } from "react"

interface ClickSparkProps {
  children: React.ReactNode
  sparkColor?: string
  sparkSize?: number
  sparkRadius?: number
  sparkCount?: number
  duration?: number
  easing?: string
  extraScale?: number
}

interface Spark {
  id: number
  x: number
  y: number
  angle: number
  scale: number
  opacity: number
  createdAt: number
}

const ClickSpark: React.FC<ClickSparkProps> = ({
  children,
  sparkColor = "#60a5fa",
  sparkSize = 8,
  sparkRadius = 20,
  sparkCount = 8,
  duration = 500,
  easing = "ease-out",
  extraScale = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sparks, setSparks] = useState<Spark[]>([])

  const createSparks = (x: number, y: number) => {
    const newSparks: Spark[] = []
    const timestamp = Date.now()

    for (let i = 0; i < sparkCount; i++) {
      const angle = (360 / sparkCount) * i
      const spark: Spark = {
        id: timestamp + i,
        x,
        y,
        angle,
        scale: Math.random() * 0.5 + 0.5,
        opacity: 1,
        createdAt: timestamp,
      }
      newSparks.push(spark)
    }

    setSparks((prev) => [...prev, ...newSparks])

    setTimeout(() => {
      setSparks((prev) => prev.filter((spark) => spark.createdAt !== timestamp))
    }, duration)
  }

  const handleClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    createSparks(x, y)
  }

  return (
    <div ref={containerRef} onClick={handleClick} className="relative" style={{ cursor: "pointer" }}>
      {children}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {sparks.map((spark) => {
          const dx = Math.cos((spark.angle * Math.PI) / 180) * sparkRadius
          const dy = Math.sin((spark.angle * Math.PI) / 180) * sparkRadius

          return (
            <div
              key={spark.id}
              className="absolute rounded-full animate-spark-fade"
              style={
                {
                  left: spark.x - sparkSize / 2,
                  top: spark.y - sparkSize / 2,
                  width: sparkSize * spark.scale * extraScale,
                  height: sparkSize * spark.scale * extraScale,
                  backgroundColor: sparkColor,
                  animationDuration: `${duration}ms`,
                  animationTimingFunction: easing,
                  "--spark-x": `${dx}px`,
                  "--spark-y": `${dy}px`,
                } as React.CSSProperties
              }
            />
          )
        })}
      </div>
    </div>
  )
}

export default ClickSpark
