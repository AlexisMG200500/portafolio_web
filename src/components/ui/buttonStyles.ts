const variants = {
  primary: 'bg-fg text-bg shadow-sm hover:shadow-[0_8px_30px_-8px_var(--accent)]',
  secondary: 'border border-line bg-card text-fg hover:border-muted/50',
  ghost: 'text-muted hover:text-fg hover:bg-card',
} as const

const sizes = {
  md: 'h-11 px-5',
  sm: 'h-9 px-4',
  icon: 'size-11', // botón cuadrado solo con icono
} as const

export type ButtonVariant = keyof typeof variants
export type ButtonSize = keyof typeof sizes

export const buttonClasses = (variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra = '') =>
  [
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-full',
    'text-sm font-medium transition-[background-color,border-color,box-shadow,color] duration-200',
    variants[variant],
    sizes[size],
    extra,
  ].join(' ')
