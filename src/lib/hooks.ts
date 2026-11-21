import { useEffect, useState } from 'react'

/**
 * Devuelve el id de la sección que está ahora en pantalla ("scroll spy").
 * Usa IntersectionObserver (eficiente: no escucha cada evento de scroll).
 * La franja de detección es la zona central de la ventana.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])

  return active
}

