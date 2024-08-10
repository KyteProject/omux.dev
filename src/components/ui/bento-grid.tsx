import { cn } from "@lib/utils"
import { motion } from "framer-motion"
import { useState } from "react"

export const BentoGrid = ({
  className,
  children
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  href
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
  href?: string
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (clientX - (rect.left + rect.width / 2)) / 20
    const y = (clientY - (rect.top + rect.height / 2)) / 20
    setMousePosition({ x, y })
  }

  return (
    <>
      <div
        className={cn(
          "relative row-span-1 rounded-xl border bg-card p-4 shadow-input hover:shadow-xl",
          className
        )}
      >
        <Noise />

        <a href={href ?? ""}>
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false)
              setMousePosition({ x: 0, y: 0 })
            }}
            style={{
              transform: isHovering
                ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)`
                : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
              transition: "transform 0.2s ease-out"
            }}
            className="flex h-full w-full flex-col justify-between space-y-4"
          >
            {header}
            <div className="">
              {icon}
              <div className="mb-2 mt-2 font-sans text-lg font-bold text-card-foreground">
                {title}
              </div>
              <div className="font-sans text-xs font-normal text-card-foreground">
                {description}
              </div>
            </div>
          </motion.div>
        </a>
      </div>
    </>
  )
}

const Noise = () => {
  return (
    <div
      className="absolute inset-0 rounded-lg opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]"
      style={{
        backgroundImage: "url(/images/noise.webp)",
        backgroundSize: "30%"
      }}
    />
  )
}
