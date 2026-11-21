import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { spring } from '../lib/motion'
import { CheckIcon, CopyIcon } from './icons'
import { buttonClasses } from './ui/buttonStyles'

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(id)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <motion.button
      type="button"
      onClick={copy}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={spring}
      className={buttonClasses('secondary', 'md', 'min-w-40')}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? 'ok' : 'copy'}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className={`inline-flex items-center gap-2 ${copied ? 'text-accent-2' : ''}`}
        >
          {copied ? <CheckIcon width={16} height={16} /> : <CopyIcon width={16} height={16} />}
          {copied ? '¡Copiado!' : 'Copiar email'}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Email copiado al portapapeles' : ''}
      </span>
    </motion.button>
  )
}
