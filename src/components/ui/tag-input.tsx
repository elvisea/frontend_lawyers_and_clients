'use client'

import * as React from 'react'
import { Plus, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface TagInputProps {
  value?: string[]
  onChange: (value: string[]) => void
  placeholder?: string
}

export function TagInput({
  value = [],
  onChange,
  placeholder = 'Digite e pressione Enter...',
}: TagInputProps) {
  const safeValue = Array.isArray(value) ? value.filter((item): item is string => Boolean(item)) : []

  const [inputValue, setInputValue] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleAdd = () => {
    const trimmedValue = inputValue.trim()
    if (trimmedValue && !safeValue.includes(trimmedValue)) {
      onChange([...safeValue, trimmedValue])
      setInputValue('')
      inputRef.current?.focus()
    }
  }

  const handleRemove = (tag: string) => {
    onChange(safeValue.filter((t) => t !== tag))
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleAdd()
            }
          }}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button
          type="button"
          size="icon"
          onClick={handleAdd}
          disabled={!inputValue.trim()}
          className="h-10 w-10"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {safeValue.map((tag, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="px-3 py-1.5 h-7 cursor-pointer hover:bg-secondary/80"
            onClick={() => handleRemove(tag)}
          >
            {tag}
            <X className="ml-2 h-3.5 w-3.5" />
          </Badge>
        ))}
      </div>
    </div>
  )
} 