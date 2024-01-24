export interface ChildNavigationLink {
  name: string
  url: string
}

export interface NavigationLink {
  name: string
  url: string
}

export const main: NavigationLink[] = [
  {
    name: "_home",
    url: "/"
  },
  {
    name: "_about",
    url: "/about"
  },
  {
    name: "_projects",
    url: "/projects"
  },
  {
    name: "_blog",
    url: "/posts"
  }
]

export const footer: NavigationLink[] = [
  {
    name: "Elements",
    url: "/elements"
  },
  {
    name: "Privacy Policy",
    url: "/privacy-policy"
  }
]
