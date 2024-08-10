"use client"
import { SparklesCore } from "@components/ui/sparkles"
import { useEffect, useState } from "react"

export function Sparkles({ text = "" }) {
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    const theme = localStorage.getItem("theme")
    if (theme) {
      setTheme(theme)
    }
  }, [])

  return (
    <div className="flex w-full flex-col items-center justify-center overflow-hidden rounded-md bg-background">
      <h1 className="relative z-20 text-center text-6xl font-bold xs:text-5xl md:text-7xl lg:text-8xl">
        {text}
      </h1>
      <div className="relative h-40 w-full">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm" />
        <div className="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm" />
        <div className="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-primary to-transparent" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="h-full w-full"
          particleColor={"#f39159"}
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 h-full w-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  )
}
