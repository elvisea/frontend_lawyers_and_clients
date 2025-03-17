import { RouteType } from '@/enums/type';
import { RouteGuard } from '@/contexts/route-guard';
import { WhatsAppButton } from "@/components/whats-app-button"

type LandingLayoutProps = {
  children: React.ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <RouteGuard type={RouteType.PUBLIC}>
      {children}
      <WhatsAppButton />
    </RouteGuard>
  )
}
