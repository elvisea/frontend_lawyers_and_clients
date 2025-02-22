'use client'

import { RouteType, UserType } from '@/enums/type';

import { routes } from '@/constants/routes';
import { RouteGuard } from '@/contexts/route-guard';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar'

type ClientRootLayoutProps = {
  children: React.ReactNode;
}

export default function ClientRootLayout({ children }: ClientRootLayoutProps) {
  return (
    <RouteGuard type={RouteType.PRIVATE} allowedTypes={[UserType.CLIENT]}>
      <div className="flex h-screen">
        <Sidebar items={routes[UserType.CLIENT]} title={UserType.CLIENT.toString()} />
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
