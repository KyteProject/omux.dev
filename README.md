# Omux.dev

Welcome to the repository for my personal website, Omux.dev. This site serves as a hub for my blog posts, project showcases, and a glimpse into my professional journey as a software engineer and music producer.

## About This Project

I've built this site using modern web technologies to create a fast, responsive, and feature-rich platform for sharing my work and thoughts. Here's an overview of the key features and technologies I've implemented:

### Core Technologies

- **Astro**: The backbone of this site. I chose Astro for its excellent performance and flexibility in using multiple frontend frameworks together.
- **React**: Used for interactive components, providing a smooth user experience.
- **Svelte**: Integrated for certain components, leveraging its simplicity and efficiency.
- **TypeScript**: Ensures type safety throughout the project, improving code quality and maintainability.
- **Tailwind CSS**: Utilised for styling, allowing for rapid development and consistent design.
- **pnpm**: My package manager of choice for its efficiency and disk space savings.

### Key Features

- **Responsive Design**: Crafted to look great on devices of all sizes, from mobile to desktop.
- **Dark Mode**: Implemented a theme switcher for comfortable viewing in any lighting condition.
- **Search Functionality**: Integrated Pagefind for fast, client-side search capabilities across the entire site.
- **MDX Support**: Allows me to write content with rich, interactive elements embedded directly in Markdown.
- **RSS Feed**: Keeps my readers updated with new content (implemented with @astrojs/rss).
- **Sitemap Generation**: Automatically generates a sitemap for better SEO (using @astrojs/sitemap).
- **Animations**: Utilises Framer Motion for smooth, engaging animations throughout the site.
- **Icons**: Implements Phosphor icons for a consistent and modern look.
- **Blog Pagination**: Ensures easy navigation through my growing collection of posts.
- **Project Gallery**: Showcases my work with a visually appealing layout.
- **Syntax Highlighting**: Makes code snippets in blog posts more readable and attractive.

### UI Components

I've integrated `shadcn-ui` components into this project. shadcn provides a set of re-usable components that are not just visually appealing but also highly customisable. These components are built on top of Radix UI primitives, ensuring accessibility and consistent behaviors across different browsers and devices. By using shadcn-ui, I've been able to:

- Rapidly develop a sleek, modern interface
- Ensure accessibility standards are met
- Maintain consistency across the site's design
- Easily customise components to fit the site's unique style

### Markdown Features

One of the key aspects of this blog is its enhanced Markdown support. I've implemented several extensions and plugins to make the content creation process more powerful and flexible. Here's an overview of the Markdown features available:

#### Standard Markdown Elements

- Headings (H1 to H6)
- Lists (ordered and unordered)
- Text formatting (bold, italic, strikethrough)
- Links and images
- Blockquotes

#### Extended Markdown Features

1. **Tooltips**: Custom directive for adding tooltips to text.

```markdown
:abbr[VST]{value="Virtual Studio Technology is an audio plug-in software interface."}
```

2. **Callouts**: Highlight important information with various callout types.

```markdown
:::note
This is a note callout
:::
```

Supported types: note, commend, assert, warn, deter

3. **Emoji Support**: Convert text codes to emojis.

```markdown
:tada: :+1:
```

4. **Math Equations**: `KaTeX` integration for rendering mathematical equations.

   - Inline math: `$equation$`
   - Block math:

   ```
   $$
   equation
   $$
   ```

5. **Code Blocks**: Enhanced code blocks with:

   - Syntax highlighting
   - Line numbers
   - Copy-to-clipboard functionality
   - Line highlighting
   - Character highlighting

6. **Figures**: Automatic figure and caption generation for images.
7. **External Links**: Automatically adds `target="_blank"` and `rel="external"` to external links.
8. **GitHub-Flavoured Markdown (GFM)**: Support for tables, task lists, and more.
9. **Smartypants**: Typographic enhancements for punctuation.
10. **Unwrapped Images**: Images are not wrapped in paragraphs for better styling control.

These Markdown features are implemented through a combination of remark and rehype plugins, as configured in the `astro.config.mjs` file. This setup allows for a rich and flexible content creation experience, enabling me to write blog posts and documentation with advanced formatting and interactive elements.

### Content Management

I've structured the content using Astro's content collections, making it easy to manage blog posts and project information. The `src/content` directory houses these collections, allowing for straightforward content creation and updates.

### Configuration and Customisation

The site's configuration is neatly organized in the `src/config` directory, allowing for easy updates to site metadata, menu items, and social links. The `tailwind.config.ts` file enables fine-tuning of the design system to match my personal brand.

## Ongoing Development

As seen in the `TODO.md` file, I'm constantly working on improvements and new features for the site. Some upcoming enhancements include:

- Implementing a newsletter system
- Creating a dedicated music page
- Enhancing the blog with sharing capabilities and tag filtering
- Developing a 404 page for better user experience

## Closing Thoughts

This website is more than just a portfolio; it's a reflection of my journey in software development and my passion for creating engaging digital experiences. I'm always open to feedback and suggestions, so feel free to reach out or contribute if you have ideas for improvement!
