import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PasswordResetState {
  isCompleted: boolean
  setCompleted: (value: boolean) => void
  reset: () => void
}

export const usePasswordResetState = create<PasswordResetState>()(
  persist(
    (set) => ({
      isCompleted: false,
      setCompleted: (value) => set({ isCompleted: value }),
      reset: () => set({ isCompleted: false })
    }),
    {
      name: 'password-reset-state'
    }
  )
) 