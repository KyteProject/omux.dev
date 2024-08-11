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
  return `${readingTimeMinutes} minutes`
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

// TRANSITIONS
export const TransitionIds = {
  post_card: {
    image: "post-card-image",
    title: "post-card-title",
    description: "post-card-description",
    meta: "post-card-meta"
  },
  project: {
    image: "project-image",
    title: "project-title"
  },
  page: {
    title: "page-title",
    description: "page-description"
  }
} as const

export interface TransitionProps {
  id: string
  slug: string
}

export type TransitionId = Pick<TransitionProps, "id">
export type TransitionSlug = Pick<TransitionProps, "slug">

export const getTransitionName = ({ id, slug }: TransitionProps): string =>
  `${id}-${slug}`

export const setTransitionSlug =
  ({ slug }: TransitionSlug) =>
  ({ id }: TransitionId) =>
    getTransitionName({ id, slug })

// THEME
export const themes = {
  light: "light",
  dark: "dark"
}

export type Theme = (typeof themes)[keyof typeof themes]

export const getCurrentTheme = (): Theme => {
  return document.documentElement.classList.contains("dark")
    ? themes.dark
    : themes.light
}

export const toggleTheme = (): Theme => {
  const currentTheme = getCurrentTheme()
  return currentTheme === themes.light ? themes.dark : themes.light
}
