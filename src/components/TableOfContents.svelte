<script lang="ts">
  import BuyMeACoffee from "@components/ui/BuyMeACoffee.svelte"
  import type { MarkdownHeading } from "astro"
  import { onDestroy, onMount } from "svelte"
  import { writable } from "svelte/store"

  export let headings: MarkdownHeading[]

  let intersecting = writable<string[]>([])
  let intersectingArticle = writable<boolean>(true)
  let headingsObserver: IntersectionObserver
  let articleObserver: IntersectionObserver

  const updateIntersecting = (entry: IntersectionObserverEntry) => {
    intersecting.update(list => {
      if (entry.isIntersecting) {
        return [...list, entry.target.id]
      } else {
        return list.filter(id => id !== entry.target.id)
      }
    })
  }

  onMount(() => {
    if (typeof IntersectionObserver === "undefined") return

    headingsObserver = new IntersectionObserver(
      headings => {
        headings.forEach(updateIntersecting)
      },
      { rootMargin: "-64px 0px 0px 0px" }
    )

    articleObserver = new IntersectionObserver(articles => {
      articles.forEach(article => {
        intersectingArticle.set(article.isIntersecting)
      })
    })

    const headingElements = document.querySelectorAll(
      "main h2, main h3, main h4, main h5, main h6"
    )
    headingElements.forEach(element => headingsObserver.observe(element))

    const mainArticle = document.getElementsByTagName("main")[0]
    articleObserver.observe(mainArticle)

    onDestroy(() => {
      headingsObserver.disconnect()
      articleObserver.disconnect()
    })
  })

  let borderedHeadings: string[] = []

  $: {
    intersecting.subscribe(ids => {
      if (ids.length > 0) {
        borderedHeadings = ids
      } else {
        borderedHeadings = []
      }
    })
  }

  intersectingArticle.subscribe(isIntersecting => {
    if (!isIntersecting) {
      borderedHeadings = []
    }
  })

  $: {
    headings.forEach(heading => {
      const linkElement = document.getElementById(`toc-link-${heading.slug}`)
      if (borderedHeadings.includes(heading.slug)) {
        linkElement?.classList.add("!border-accent")
      } else {
        linkElement?.classList.remove("!border-accent")
      }
    })
  }

  const scrollToHeading = (slug: string) => {
    const headingElement = document.getElementById(slug)
    if (headingElement) {
      headingElement.scrollIntoView({ behavior: "smooth" })
      headingElement.focus() // Ensure the heading is focused after scrolling for accessibility
    }
  }
</script>

<aside class="sticky top-24">
  {#if Array.isArray(headings)}
    <nav
      id="post-toc"
      aria-label="Table of Contents"
      dir="ltr"
      class="max-h-[calc(100vh-12rem)] overflow-y-auto"
    >
      <ul dir="ltr" id="toc-list-root">
        <span class="text-xl">On This Page:</span>
        {#each headings as { depth, text, slug }}
          <li id={`toc-item-${slug}`} class="flex flex-col">
            <a
              href={`#${slug}`}
              aria-label={`Link to ${text}`}
              dir="ltr"
              id={`toc-link-${slug}`}
              class="cursor-pointer border-l-2 border-transparent pr-4 transition-all hover:border-accent hover:bg-accent hover:bg-opacity-10 active:bg-accent active:font-bold active:text-accent-foreground duration-500"
              class:pl-4={depth <= 2}
              class:pl-8={depth === 3}
              class:pl-12={depth === 4}
              class:pl-16={depth === 5}
              class:pl-20={depth === 6}
              on:click|preventDefault={() => scrollToHeading(slug)}
              on:keydown|preventDefault={event =>
                event.key === "Enter" && scrollToHeading(slug)}
            >
              {text}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}
  <BuyMeACoffee />
</aside>

<style>
  nav {
    scrollbar-gutter: stable;
    scrollbar-width: thin;
    scroll-behavior: smooth;
  }
</style>
