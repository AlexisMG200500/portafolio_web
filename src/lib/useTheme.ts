import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

/*
 * Hook de tema claro / oscuro.
 * - Lee el tema inicial de la clase en <html> (la pone el script de index.html).
 * - Al cambiar, pone .light o .dark en <html> y lo guarda en localStorage.
 *   (Thinking Orbs lee esas clases para pintar sus puntos claros u oscuros.)
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.classList.toggle('light', theme === 'light')
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0a0a0b' : '#ebe8e1')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // modo privado / almacenamiento bloqueado: el tema simplemente no se recuerda
    }
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  return { theme, toggle }
}
