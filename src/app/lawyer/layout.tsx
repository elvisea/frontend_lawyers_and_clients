import { RouteGuard } from '@/contexts/route-guard';
import { RouteType, UserType } from '@/enums/type';

type LawyerRootLayoutProps = {
  children: React.ReactNode;
}

export default function LawyerRootLayout({ children }: LawyerRootLayoutProps) {
  return (
    <RouteGuard type={RouteType.PRIVATE} allowedTypes={[UserType.LAWYER]}>
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-xs">{children}</div>
      </div>
    </RouteGuard>
  )
}
