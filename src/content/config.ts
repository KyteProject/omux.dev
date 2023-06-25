import { defineCollection, z } from "astro:content"

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z
      .object({
        author: z.string().optional(),
        pubDatetime: z.date(),
        title: z.string(),
        postSlug: z.string().optional(),
        featured: z.boolean().optional(),
        draft: z.boolean().optional(),
        categories: z.array(z.string()).default(["misc"]),
        tags: z.array(z.string()).default(["others"]),
        ogImage: image().refine(img => img.width >= 720, {
          message: "Cover image must be at least 720 pixels wide!"
        }),
        description: z.string(),
        extra: z
          .array(z.enum(["math", "markmap", "mermaid", "gallery"]))
          .optional(),
        readingTime: z.string().optional(),
        comments: z.boolean()
      })
      .strict()
})

const projectCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        postSlug: z.string(),
        categories: z.array(z.string()).default(["other"]),
        ogImage: image().refine(img => img.width >= 720, {
          message: "Cover image must be at least 720 pixels wide!"
        }),
        description: z.string(),
        extra: z.array(z.enum(["gallery"])).optional(),
        repoLink: z.string().optional(),
        demoLink: z.string().optional()
      })
      .strict()
})

export const collections = {
  blog: blogCollection,
  projects: projectCollection
}
