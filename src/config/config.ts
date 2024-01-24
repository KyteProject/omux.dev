export type SiteConfig = {
  title: string
  base_url: string
  base_path: string
  trailing_slash: boolean
  favicon: string
  logo_enable: boolean
  logo: string
  logo_darkmode: string
  logo_width: number
  logo_height: number
  logo_text: string
  locale: string[]
}

export const site: SiteConfig = {
  title: "Synth & Syntax",
  base_url: "https://omux.dev",
  base_path: "/",
  trailing_slash: false,
  favicon: "/assets/logo.svg",
  logo_enable: false,
  logo: "/assets/logo.svg",
  logo_darkmode: "/assets/logo.svg",
  logo_width: 150,
  logo_height: 30,
  logo_text: "Omux.dev",
  locale: ["en-GB"]
}

export type SettingsConfig = {
  search: boolean
  sticky_header: boolean
  theme_switcher: boolean
  default_theme: string
  pagination: number
  summary_length: number
  blog_folder: string
}

export const settings: SettingsConfig = {
  search: true,
  sticky_header: true,
  theme_switcher: true,
  default_theme: "system",
  pagination: 5,
  summary_length: 200,
  blog_folder: "blog"
}

export type ParamsConfig = {
  contact_form_action: string
  copyright: string
}

export const params: ParamsConfig = {
  contact_form_action: "#",
  copyright: "Designed And Developed by [Daniel Smith](https://omux.dev)"
}

export type MetadataConfig = {
  author: string
  image: string
  description: string
  keywords: string
}

export const metadata: MetadataConfig = {
  author: "Daniel Smith",
  image: "/images/og-image.png",
  description:
    "Software engineer, D&B Producer, Parkour Dinosaur. I write about sytem design, architecture, cybersecurity, and web development",
  keywords:
    "software, engineering, architecture, cybersecurity, web development, daniel smith, omux.dev"
}

// export const LOGO_IMAGE = {
//   enable: false,
//   svg: true,
//   width: 216,
//   height: 46
// }
