import rss from "@astrojs/rss"
import { metadata, site } from "@config/config"
import { getCollection } from "astro:content"

export async function GET(context) {
  const blog = (await getCollection("blog")).filter(post => !post.data.draft)

  const projects = (await getCollection("projects")).filter(
    project => !project.data.draft
  )

  const items = [...blog, ...projects].sort(
    (a, b) =>
      new Date(b.data.pubDatetime).valueOf() -
      new Date(a.data.pubDatetime).valueOf()
  )

  return rss({
    title: site.title,
    description: metadata.description,
    site: context.site,
    items: items.map(item => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.pubDatetime,
      link: `/${item.collection}/${item.slug}/`
    }))
  })
}
