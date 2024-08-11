import { metadata, site } from "@config/config"
import { getCollection } from "astro:content"

export const get = async function get(context) {
  const blog = (await getCollection("blog")).filter(post => !post.data.draft)

  const projects = (await getCollection("projects")).filter(
    project => !project.data.draft
  )

  const items = [...blog, ...projects].sort(
    (a, b) =>
      new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()
  )

  return JSON.stringify({
    version: "https://jsonfeed.org/version/1",
    title: site.title,
    description: metadata.description,
    site: context.site,
    feed_url: `${context.site}/feed.json`,
    items: items.map(item => ({
      title: item.data.title,
      description: item.data.description,
      date_published: item.data.pubDate,
      link: `/${item.collection}/${item.slug}/`
    })),
    headers: {
      "Content-Type": "application/json"
    }
  })
}
