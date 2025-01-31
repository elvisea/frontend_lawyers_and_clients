import { Route } from "@/constants/routes"

export interface SidebarItem {
  label: string
  path: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface SidebarProps {
  items: Record<string, Route>
  title?: string
} 