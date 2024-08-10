import { defineCollection, z, type SchemaContext } from "astro:content"

const blog = defineCollection({
  type: "content",
  schema: ({ image }: SchemaContext) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        pubDatetime: z.coerce.date(),
        updateDatetime: z.coerce.date().optional(),
        draft: z.boolean().optional(),
        featured: z.boolean().optional(),
        categories: z.array(z.string()).default(["misc"]),
        tags: z.array(z.string()).default(["others"]),
        ogImage: image().refine(img => img.width >= 720, {
          message: "Cover image must be at least 720 pixels wide!"
        }),
        commentsEnabled: z.boolean().optional(),
        tocEnabled: z.boolean().optional()
      })
      .strict()
})

const projects = defineCollection({
  type: "content",
  schema: ({ image }: SchemaContext) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        pubDatetime: z.coerce.date(),
        updateDatetime: z.coerce.date().optional(),
        draft: z.boolean().optional(),
        category: z.string().default("software"),
        ogImage: image().refine(img => img.width >= 720, {
          message: "Cover image must be at least 720 pixels wide!"
        }),
        repoLink: z.string().optional(),
        demoLink: z.string().optional(),
        toc_enabled: z.boolean().optional()
      })
      .strict()
})

export const collections = {
  blog,
  projects
}
