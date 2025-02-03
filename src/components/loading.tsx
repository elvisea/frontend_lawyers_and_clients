'use client'

import { Loader2 } from 'lucide-react'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
} as const

export function Loading({ size = 'md' }: LoadingProps) {
  console.log('📝 Loading Component')
  console.log('├─ Size:', size)

  return (
    <div className="flex items-center justify-center flex-1 h-full">
      <Loader2 className={`animate-spin text-muted-foreground ${sizeMap[size]}`} />
    </div>
  )
}
