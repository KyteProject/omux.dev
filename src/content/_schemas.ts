import { ImageFunction, z } from "astro:content"

const image: ImageFunction = () =>
  z.object({
    src: z.string(),
    width: z.number(),
    height: z.number(),
    format: z.union([
      z.literal("png"),
      z.literal("jpg"),
      z.literal("jpeg"),
      z.literal("tiff"),
      z.literal("webp"),
      z.literal("gif"),
      z.literal("svg")
    ])
  })

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

export const projectSchema = z
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

export type BlogFrontmatter = z.infer<typeof blogSchema>
export type ProjectFrontmatter = z.infer<typeof projectSchema>
