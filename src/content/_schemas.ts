import { z } from "astro:content"

export const blogSchema = z
  .object({
    author: z.string().optional(),
    pubDatetime: z.date(),
    title: z.string(),
    postSlug: z.string().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    categories: z.array(z.string()).default(["misc"]),
    tags: z.array(z.string()).default(["others"]),
    ogImage: z.string().optional(),
    description: z.string(),
    extra: z
      .array(z.enum(["math", "markmap", "mermaid", "gallery"]))
      .optional(),
    readingTime: z.string().optional(),
    comments: z.boolean()
  })
  .strict()

export type BlogFrontmatter = z.infer<typeof blogSchema>
