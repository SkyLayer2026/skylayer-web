import { useEffect, useRef } from "react"

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Skylayer` : "Skylayer — Tecnologia acessível para o crescimento da sua empresa"
  }, [title])
}

export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible")
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.classList.add("is-visible")
          io.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}