import { motion, type HTMLMotionProps } from 'motion/react'
import { spring } from '../../lib/motion'
import { buttonClasses, type ButtonSize, type ButtonVariant } from './buttonStyles'

type ButtonLinkProps = HTMLMotionProps<'a'> & { variant?: ButtonVariant; size?: ButtonSize }

export function ButtonLink({ variant = 'primary', size = 'md', className = '', ...props }: ButtonLinkProps) {
  const isExternal = typeof props.href === 'string' && props.href.startsWith('http')

  return (
    <motion.a
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={spring}
      className={buttonClasses(variant, size, className)}
      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
      {...props}
    />
  )
}
