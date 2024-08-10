import { config } from "@config"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  return Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date)
}

export function readingTime(html: string) {
  const textOnly = html.replace(/<[^>]+>/g, "")
  const wordCount = textOnly.split(/\s+/).length
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed()
  return `${readingTimeMinutes} min read`
}

interface GetPaginationProps<T> {
  posts: T
  page: string | number
  isIndex?: boolean
}

export const getPageNumbers = (numberOfPosts: number) => {
  const numberOfPages = numberOfPosts / Number(config.site.pagination)

  let pageNumbers: number[] = []
  for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
    pageNumbers = [...pageNumbers, i]
  }

  return pageNumbers
}

export const getPagination = <T>({
  posts,
  page,
  isIndex = false
}: GetPaginationProps<T[]>) => {
  const totalPagesArray = getPageNumbers(posts.length)
  const totalPages = totalPagesArray.length

  const currentPage = isIndex
    ? 1
    : page && !isNaN(Number(page)) && totalPagesArray.includes(Number(page))
      ? Number(page)
      : 0

  const lastPost = isIndex
    ? config.site.pagination
    : currentPage * config.site.pagination
  const startPost = isIndex ? 0 : lastPost - config.site.pagination
  const paginatedPosts = posts.slice(startPost, lastPost)

  return {
    totalPages,
    currentPage,
    paginatedPosts
  }
}
