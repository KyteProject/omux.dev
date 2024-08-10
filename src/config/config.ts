export type SiteConfig = {
  title: string
  owner: string
  subtitle: string
  base_url: string
  base_path: string
  trailing_slash: boolean
  favicon: string
  logo_enable: boolean
  logo: string
  logo_darkmode: string
  logo_text: string
  locale: string[]
  pagination: number
  summary_length: number
}

export const site: SiteConfig = {
  title: "Synth & Syntax",
  owner: "Daniel Smith",
  subtitle: "Adventures in Software and Sound",
  base_url: "https://omux.dev",
  base_path: "/",
  trailing_slash: false,
  favicon: "/static/favicon.png",
  logo_enable: false,
  logo: "/assets/logo.svg",
  logo_darkmode: "/assets/logo.svg",
  logo_text: "Omux.dev",
  locale: ["en-GB"],
  pagination: 12,
  summary_length: 200
}

export type MetadataConfig = {
  author: string
  image: string
  description: string
  keywords: string
}

export const metadata: MetadataConfig = {
  author: "Daniel Smith",
  image: "/blog-placeholder-1.jpg",
  description:
    "Software engineer, D&B Producer, Parkour Dinosaur. I write about system design, architecture, cybersecurity, and web development",
  keywords:
    "software, engineering, architecture, cybersecurity, web development, daniel smith, omux.dev"
}
