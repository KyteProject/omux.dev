---
title: "An overview of Site Redesign & Markdown Demo"
pubDate: 2024-06-18
slug: "website-redesign-and-markdown-demo"
featured: false
draft: true
commentsEnabled: false
categories:
  - Updates
tags:
  - Markdown
ogImage: "./cpu-4393376_1920.jpg"
description: "Lear how abstraction helps manage complexity by hiding unnecessary details"
---

Welcome to the comprehensive Markdown features testing blog post! This post will cover various Markdown elements to ensure everything renders correctly.

## Headings

Markdown supports different levels of headings. Here are examples:

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

## Lists

### Unordered List

- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
- Item 3

### Ordered List

1. First item
2. Second item
   1. Subitem 2.1
   2. Subitem 2.2
3. Third item

## Text Formatting

Here are some text formatting examples:

- **Bold text**
- _Italic text_
- **_Bold and Italic text_**
- ~~Strikethrough text~~
- [Link to Astro](https://astro.build)

## Images

Here's an example of an image:

![Astro Logo](https://astro.build/assets/press/astro-icon-light.png)

## Blockquotes

> This is a blockquote. Blockquotes are used to highlight quotes or important text.

## Tooltips

Tooltips in Markdown are supported by using custom directives.

```
:abbr[VST]{value="Virtual Studio Technology is an audio plug-in software interface."} has a tooltip!
```

:abbr[VST]{value="Virtual Studio Technology is an audio plug-in software interface."} has a tooltip!

## Callouts

Callouts can be used to highlight important information. Supported callout types are: `note`, `commend`, `assert`, `warn`, and `deter`.

```
:::note
note callout
:::
```

:::note
note callout
:::

:::commend
commend callout
:::

:::assert
assert callout
:::

:::warn
warn callout
:::

:::deter
deter callout
:::

## Emoji

Emoji transpiling from text codes are supported.

`:tada: :+1:` => :tada: :+1:

## Katex

### Multi-line

Multi-line equations are supported using the `$$` delimiters.

```
$$
\begin{aligned}M= & 1-\exp \left(\frac{-1.51714 \times \exp (x b)}{0.0076927}\right) \\ \\ \text { phenotypic age } = & 141.50225+\frac{\log (-0.00553 \times \log (1-M))}{0.09165}\end{aligned}
$$
```

$$
\begin{aligned}M= & 1-\exp \left(\frac{-1.51714 \times \exp (x b)}{0.0076927}\right) \\ \\ \text { phenotypic age } = & 141.50225+\frac{\log (-0.00553 \times \log (1-M))}{0.09165}\end{aligned}
$$

### Inline

Inline math is written enclosed by single `$` delimiter.

And `$xb$` represents... => And $xb$ represents...

## Code

Code blocks come themed, and with line-numbers and copy-to-clipboard button. Additional features are also available as demonstrated below:

### Inline Code

Here's some `inline code`.

### Block Code

```javascript
// This is a JavaScript code block
function greet(name) {
  return `Hello, ${name}!`
}

console.log(greet("world"))
```

### Highlighted Lines

````markdown
```go {1-3,5,9}

```
````

```go {1-3,5,9}
func CalculateRectangleArea(length, width float64) float64 {
    return CalculateArea(length, width)
}

func CalculateSquareArea(side float64) float64 {
    return CalculateArea(side, side)
}

func CalculateArea(a, b float64) float64 {
    return a * b
}
```

### Highlight Chars

````markdown
```js /carrot/ /apple/

```
````

```js /carrot/ /apple/
const carrot = "🥕"
const apple = "🍎"
```
