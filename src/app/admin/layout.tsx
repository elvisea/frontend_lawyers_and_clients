import { RouteGuard } from '@/contexts/route-guard';
import { RouteType, UserType } from '@/enums/type';

type AdminRootLayoutProps = {
  children: React.ReactNode;
}

export default function AdminRootLayout({ children }: AdminRootLayoutProps) {
  return (
    <RouteGuard type={RouteType.PRIVATE} allowedTypes={[UserType.ADMIN]}>
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-xs">{children}</div>
      </div>
    </RouteGuard>
  )
}
