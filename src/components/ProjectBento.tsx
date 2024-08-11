"use client"
import { cn } from "@lib/utils"
import { Barcode, BezierCurve, Code, UsersThree } from "@phosphor-icons/react"
import type { CollectionEntry } from "astro:content"
import { BentoGrid, BentoGridItem } from "./ui/bento-grid"

const iconMap = {
  software: <Code className="text-red" />,
  design: <BezierCurve className="text-yellow" />,
  product: <Barcode className="text-blue-300" />,
  community: <UsersThree className="text-magenta" />
}

const colorMap = {
  software: "border-red",
  design: "border-yellow",
  product: "border-blue-300",
  community: "border-magenta"
}

export const ProjectBento = ({
  items
}: {
  items: CollectionEntry<"projects">[]
}) => {
  return (
    <BentoGrid className="mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.data.title}
          description={<span className="text-sm">{item.data.description}</span>}
          header={
            <BentoGridItemImage
              image={item.data.ogImage}
              alt={item.data.title}
            />
          }
          className={cn(
            "[&>p:text-lg] cursor-pointer",
            i === 4 || i === 8 ? "md:col-span-2" : "",
            `hover:border-${
              colorMap[item.data.category as keyof typeof colorMap]
            }`
          )}
          icon={iconMap[item.data.category as keyof typeof iconMap]}
          href={`/projects/${item.slug}`}
        />
      ))}
    </BentoGrid>
  )
}

const BentoGridItemImage = ({
  image,
  alt
}: {
  image: CollectionEntry<"projects">["data"]["ogImage"]
  alt: string
}) => {
  return (
    <div className="flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2">
      <div className="h-full w-full flex-shrink-0 rounded-lg">
        <img
          src={image.src}
          className="h-full w-full rounded-lg object-cover"
          alt={alt}
          loading="lazy"
        />
      </div>
    </div>
  )
}
