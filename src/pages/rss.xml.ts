import rss from "@astrojs/rss"
import { metadata, site } from "@config/config"
import getSortedPosts from "@utils/getSortedPosts"
import slugify from "@utils/slugify"
import { getCollection } from "astro:content"

export async function get() {
  const posts = await getCollection("blog")
  const sortedPosts = getSortedPosts(posts)
  return rss({
    title: site.title,
    description: metadata.description,
    site: site.base_url,
    items: sortedPosts.map(({ data }) => ({
      link: `posts/${slugify(data)}`,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.pubDatetime)
    }))
  })
}
