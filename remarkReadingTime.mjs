import getReadingTime from "reading-time"
import { toString } from "mdast-util-to-string"

export function remarkReadingTime() {
  return function(tree, { data }) {
    const contentOnPage = toString(tree)
    const calculateReadingTime = getReadingTime(contentOnPage)
    data.astro.frontmatter.readingTime = calculateReadingTime.text
  }
}
