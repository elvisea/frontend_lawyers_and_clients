'use client'

import { RouteType, UserType } from '@/enums/type';

import { routes } from '@/constants/routes';
import { RouteGuard } from '@/contexts/route-guard';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar'

type LawyerRootLayoutProps = {
  children: React.ReactNode;
}

export default function LawyerRootLayout({ children }: LawyerRootLayoutProps) {
  return (
    <RouteGuard type={RouteType.PRIVATE} allowedTypes={[UserType.LAWYER]}>
      <div className="flex h-screen">
        <Sidebar items={routes[UserType.LAWYER]} title={UserType.LAWYER.toString()} />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-8">
            {children}
          </main>
        </div>
      </div>
    </RouteGuard>
  )
}
