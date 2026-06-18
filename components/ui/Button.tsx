'use client'

import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export default function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full px-5 h-10 font-medium transition-colors',
        variant === 'primary' && 'bg-foreground text-background hover:bg-foreground/90',
        variant === 'secondary' && 'border border-muted/20 hover:bg-foreground/5',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
