import { RouteGuard } from '@/contexts/route-guard';
import { RouteType, UserType } from '@/enums/type';

type ClientRootLayoutProps = {
  children: React.ReactNode;
}

export default function ClientRootLayout({ children }: ClientRootLayoutProps) {
  return (
    <RouteGuard type={RouteType.PRIVATE} allowedTypes={[UserType.CLIENT]}>
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-xs">{children}</div>
      </div>
    </RouteGuard>
  )
}
