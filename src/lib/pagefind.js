// pagefind.js
export function setupPagefind() {
  const magnifyingGlass = document.getElementById("magnifying-glass")
  const backdrop = document.getElementById("backdrop")

  function openPagefind() {
    const searchDiv = document.getElementById("search")
    const search = searchDiv.querySelector("input")
    setTimeout(() => {
      search.focus()
    }, 0)
    backdrop?.classList.remove("invisible")
    backdrop?.classList.add("visible")
  }

  function closePagefind() {
    const search = document.getElementById("search")
    search.value = ""
    backdrop?.classList.remove("visible")
    backdrop?.classList.add("invisible")
  }

  // open pagefind
  magnifyingGlass?.addEventListener("click", () => {
    openPagefind()
  })

  document.addEventListener("keydown", e => {
    if (e.key === "/") {
      e.preventDefault()
      openPagefind()
    } else if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault()
      openPagefind()
    }
  })

  // close pagefind
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" || e.keyCode === 27) {
      closePagefind()
    }
  })

  backdrop?.addEventListener("click", event => {
    if (!event.target.closest("#pagefind-container")) {
      closePagefind()
    }
  })

  // prevent form submission
  const form = document.getElementById("form")
  form?.addEventListener("submit", event => {
    event.preventDefault()
  })
}
