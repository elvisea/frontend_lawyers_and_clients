import { RouteType } from '@/enums/type';
import { RouteGuard } from '@/contexts/route-guard';

type LandingLayoutProps = {
  children: React.ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <RouteGuard type={RouteType.PUBLIC}>
      {children}
    </RouteGuard>
  )
}
