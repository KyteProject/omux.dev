import type { Site, SocialObjects } from "./types"

export const SITE: Site = {
  website: "https://omux.dev/",
  author: "Daniel Smith",
  desc: "Software engineer, D&B Producer, Parkour Dinosaur. I write about sytem design, architecture, cybersecurity, and web development",
  title: "Synth & Syntax",
  lightAndDarkMode: true,
  postPerPage: 8
}

export const LOCALE = ["en-GB"]

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46
}

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/KyteProject",
    linkTitle: ` ${SITE.title} on Github`,
    active: true
  },
  {
    name: "Facebook",
    href: "",
    linkTitle: `${SITE.title} on Facebook`,
    active: false
  },
  {
    name: "Instagram",
    href: "",
    linkTitle: `${SITE.title} on Instagram`,
    active: false
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/daniel-s-30b70a97/",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true
  },
  {
    name: "Mail",
    href: "mailto:dan@omux.dev",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true
  },
  {
    name: "Twitter",
    href: "https://twitter.com/omuxdev",
    linkTitle: `${SITE.title} on Twitter`,
    active: true
  },
  {
    name: "Twitch",
    href: "",
    linkTitle: `${SITE.title} on Twitch`,
    active: false
  },
  {
    name: "YouTube",
    href: "",
    linkTitle: `${SITE.title} on YouTube`,
    active: false
  },
  {
    name: "WhatsApp",
    href: "",
    linkTitle: `${SITE.title} on WhatsApp`,
    active: false
  },
  {
    name: "Snapchat",
    href: "",
    linkTitle: `${SITE.title} on Snapchat`,
    active: false
  },
  {
    name: "Pinterest",
    href: "",
    linkTitle: `${SITE.title} on Pinterest`,
    active: false
  },
  {
    name: "TikTok",
    href: "",
    linkTitle: `${SITE.title} on TikTok`,
    active: false
  },
  {
    name: "CodePen",
    href: "",
    linkTitle: `${SITE.title} on CodePen`,
    active: false
  },
  {
    name: "Discord",
    href: "",
    linkTitle: `${SITE.title} on Discord`,
    active: false
  },
  {
    name: "GitLab",
    href: "https://gitlab.com/omux",
    linkTitle: `${SITE.title} on GitLab`,
    active: true
  },
  {
    name: "Reddit",
    href: "",
    linkTitle: `${SITE.title} on Reddit`,
    active: false
  },
  {
    name: "Skype",

    href: "",
    linkTitle: `${SITE.title} on Skype`,
    active: false
  },
  {
    name: "Steam",
    href: "",
    linkTitle: `${SITE.title} on Steam`,
    active: false
  },
  {
    name: "Telegram",
    href: "",
    linkTitle: `${SITE.title} on Telegram`,
    active: false
  },
  {
    name: "Mastodon",
    href: "",
    linkTitle: `${SITE.title} on Mastodon`,
    active: false
  }
]
