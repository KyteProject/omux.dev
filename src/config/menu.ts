export interface NavigationLink {
  name: string
  href: string
  target?: string
}

export const main: NavigationLink[] = [
  {
    name: "About",
    href: "/about"
  },
  {
    name: "Blog",
    href: "/blog"
  },
  {
    name: "Projects",
    href: "/projects"
  },
  {
    name: "Music",
    href: "https://linktr.ee/omuxdnb",
    target: "_blank"
  },
  {
    name: "Now",
    href: "/now"
  },
  {
    name: "Uses",
    href: "/uses"
  },
  {
    name: "TIL",
    href: "/today-i-learned"
  }
]

export const footer: NavigationLink[] = [
  {
    name: "Sitemap",
    href: "/sitemap-index.xml"
  },
  {
    name: "RSS",
    href: "/rss.xml"
  }
]
