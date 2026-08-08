import { useEffect } from "react"

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Skylayer` : "Skylayer — Tecnologia acessível para o crescimento da sua empresa"
  }, [title])
}
