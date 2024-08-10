import { site } from "./config"

export const socials: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/KyteProject",
    linkTitle: ` ${site.title} on Github`,
    active: true
  },
  {
    name: "Facebook",
    href: "",
    linkTitle: `${site.title} on Facebook`,
    active: false
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/omuxdnb/",
    linkTitle: `${site.title} on Instagram`,
    active: true
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/daniel-s-30b70a97/",
    linkTitle: `${site.title} on LinkedIn`,
    active: true
  },
  {
    name: "Mail",
    href: "mailto:dan@omux.dev",
    linkTitle: `Email me at: dan@omux.dev`,
    active: true
  },
  {
    name: "X",
    href: "https://x.com/omuxdev",
    linkTitle: `${site.title} on X`,
    active: true
  },
  {
    name: "LinkTree",
    href: "https://linktr.ee/omuxdnb",
    linkTitle: `${site.title} on Linktree`,
    active: true
  },
  {
    name: "Twitch",
    href: "",
    linkTitle: `${site.title} on Twitch`,
    active: false
  },
  {
    name: "YouTube",
    href: "",
    linkTitle: `${site.title} on YouTube`,
    active: false
  },
  {
    name: "WhatsApp",
    href: "",
    linkTitle: `${site.title} on WhatsApp`,
    active: false
  },
  {
    name: "Snapchat",
    href: "",
    linkTitle: `${site.title} on Snapchat`,
    active: false
  },
  {
    name: "Pinterest",
    href: "",
    linkTitle: `${site.title} on Pinterest`,
    active: false
  },
  {
    name: "TikTok",
    href: "",
    linkTitle: `${site.title} on TikTok`,
    active: false
  },
  {
    name: "CodePen",
    href: "",
    linkTitle: `${site.title} on CodePen`,
    active: false
  },
  {
    name: "Discord",
    href: "",
    linkTitle: `${site.title} on Discord`,
    active: false
  },
  {
    name: "GitLab",
    href: "https://gitlab.com/omux",
    linkTitle: `${site.title} on GitLab`,
    active: true
  },
  {
    name: "Reddit",
    href: "",
    linkTitle: `${site.title} on Reddit`,
    active: false
  },
  {
    name: "Skype",

    href: "",
    linkTitle: `${site.title} on Skype`,
    active: false
  },
  {
    name: "Steam",
    href: "",
    linkTitle: `${site.title} on Steam`,
    active: false
  },
  {
    name: "Telegram",
    href: "",
    linkTitle: `${site.title} on Telegram`,
    active: false
  },
  {
    name: "Mastodon",
    href: "",
    linkTitle: `${site.title} on Mastodon`,
    active: false
  },
  {
    name: "Soundcloud",
    href: "https://soundcloud.com/omux",
    linkTitle: `${site.title} on Soundcloud`,
    active: true
  }
]

export type SocialObjects = {
  name: SocialMedia
  href: string
  active: boolean
  linkTitle: string
}[]

export type SocialIcons = {
  [social in SocialMedia]: string
}

export type SocialMedia =
  | "Github"
  | "Facebook"
  | "Instagram"
  | "LinkedIn"
  | "Mail"
  | "Twitter"
  | "Twitch"
  | "Soundcloud"
  | "YouTube"
  | "WhatsApp"
  | "Snapchat"
  | "Pinterest"
  | "TikTok"
  | "CodePen"
  | "Discord"
  | "GitLab"
  | "Reddit"
  | "Skype"
  | "Steam"
  | "Telegram"
  | "Mastodon"
  | "X"
  | "LinkTree"
