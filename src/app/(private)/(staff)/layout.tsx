'use client'

import { RouteType, UserType } from '@/enums/type';

import { routes } from '@/constants/routes';
import { RouteGuard } from '@/contexts/route-guard';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar'

type StaffRootLayoutProps = {
  children: React.ReactNode;
}

export default function StaffRootLayout({ children }: StaffRootLayoutProps) {
  return (
    <RouteGuard type={RouteType.PRIVATE} allowedTypes={[UserType.STAFF]}>
      <div className="flex h-screen">
        <Sidebar items={routes[UserType.STAFF]} title={UserType.STAFF.toString()} />
        <div className="flex-1 flex flex-col pt-16">
          <div className="px-4">
            <Header />
          </div>
          <main className="flex-1 overflow-y-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </RouteGuard>
  )
}
