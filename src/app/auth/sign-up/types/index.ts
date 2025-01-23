export type State = {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}