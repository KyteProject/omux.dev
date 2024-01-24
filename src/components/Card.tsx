import type { BlogFrontmatter } from "@content/_schemas"
import Datetime from "./Datetime"

export interface Props {
  href?: string
  frontmatter: BlogFrontmatter
  secHeading?: boolean
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, description, readingTime } = frontmatter
  return (
    <li className="text-foreground-muted my-6">
      <span className="animate-pulse text-accent">&gt;&nbsp;</span>
      <a
        href={href}
        className="inline-block text-xl font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 className="font-medium decoration-dashed hover:underline">
            {title}
          </h2>
        ) : (
          <h3 className="font-medium decoration-dashed hover:underline">
            {title}
          </h3>
        )}
      </a>
      <Datetime datetime={pubDatetime} readingTime={readingTime} />
      <p>{description}</p>
    </li>
  )
}
