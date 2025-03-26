import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

import { env } from '@/env'

import { AuthProvider } from '@/contexts/auth-context'
import { ThemeProvider } from '@/components/theme-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: `${env.NEXT_PUBLIC_SITE_NAME} - Conectando Clientes e Advogados`,
    template: `%s | ${env.NEXT_PUBLIC_SITE_NAME}`
  },
  description: env.NEXT_PUBLIC_SITE_DESCRIPTION,
  keywords: ['advocacia', 'jurídico', 'advogados', 'casos jurídicos', 'documentos legais', 'consultoria jurídica', 'direito'],
  authors: [{ name: env.NEXT_PUBLIC_SITE_NAME }],
  creator: env.NEXT_PUBLIC_SITE_NAME,
  publisher: env.NEXT_PUBLIC_SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: env.NEXT_PUBLIC_SITE_URL,
    siteName: env.NEXT_PUBLIC_SITE_NAME,
    title: `${env.NEXT_PUBLIC_SITE_NAME} - Conectando Clientes e Advogados`,
    description: env.NEXT_PUBLIC_SITE_DESCRIPTION,
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: `${env.NEXT_PUBLIC_SITE_NAME} - Plataforma Jurídica`
    }],
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
