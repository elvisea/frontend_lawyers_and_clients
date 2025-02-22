'use client'

import { RouteType, UserType } from '@/enums/type';

import { routes } from '@/constants/routes';
import { RouteGuard } from '@/contexts/route-guard';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar'

type AdminRootLayoutProps = {
  children: React.ReactNode;
}

export default function AdminRootLayout({ children }: AdminRootLayoutProps) {
  return (
    <RouteGuard type={RouteType.PRIVATE} allowedTypes={[UserType.ADMIN]}>
      <div className="flex h-screen">
        <Sidebar items={routes[UserType.ADMIN]} title={UserType.ADMIN.toString()} />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </RouteGuard>
  )
}
