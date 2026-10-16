import { useEffect } from "react"

const DARK_SCHEME_QUERY = "(prefers-color-scheme: dark)"

function setIconHref(href: string) {
  document
    .querySelector<HTMLLinkElement>('link[rel="icon"][type="image/svg+xml"]')
    ?.setAttribute("href", href)
}

export function useFaviconTheme() {
  useEffect(() => {
    const query = window.matchMedia(DARK_SCHEME_QUERY)
    const update = () => {
      setIconHref(query.matches ? "/favicon-dark.svg" : "/favicon-light.svg")
    }
    update()
    query.addEventListener("change", update)
    return () => {
      query.removeEventListener("change", update)
    }
  }, [])
}
