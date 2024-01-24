"use client"
import { useCallback, useEffect, useState } from "react"

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

export const AnimatedText = () => {
  const textArray = [
    "Problem Solver",
    "Software Engineer",
    "Musician",
    "Artist",
    "Learner",
    "Mentor",
    "Traceur",
    "Human"
  ]

  const [text, setText] = useState(textArray[0])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const animateText = useCallback(() => {
    let iteration = 0
    const currentText = textArray[currentIndex]
    setIsAnimating(true)

    const animate = () => {
      setText(
        currentText
          .split("")
          .map((char, index) =>
            index < iteration
              ? char
              : letters[Math.floor(Math.random() * letters.length)]
          )
          .join("")
      )

      if (iteration < currentText.length) {
        iteration += 1 / 3
        setTimeout(animate, 30)
      } else {
        setIsAnimating(false)
        setTimeout(() => {
          setCurrentIndex(prevIndex => (prevIndex + 1) % textArray.length)
        }, 3000)
      }
    }

    animate()
  }, [currentIndex])

  useEffect(() => {
    if (!isAnimating) {
      animateText()
    }
  }, [currentIndex, animateText])

  return (
    <h2 className="text-base text-muted-foreground sm:text-xl md:text-2xl">
      <span className="animate-pulse">&gt;&nbsp;</span>
      <span className="text-accent-foreground">{text}</span>
    </h2>
  )
}
