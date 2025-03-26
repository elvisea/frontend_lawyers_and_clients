import { MetadataRoute } from 'next'
import { env } from '@/env'

const { NEXT_PUBLIC_SITE_URL } = env

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/landing/clients',
        '/landing/lawyers',
      ],
      disallow: [
        '/api/',
        '/admin/',
        '/(private)/',
        '/(staff)/',
        '/client/',
        '/lawyer/',
        '/auth/',
        // Garantindo que nenhuma rota privada seja indexada
        '/users/',
        '/cases/',
        '/profile/',
        '/documents/',
        '/settings/',
        '/dashboard/',
      ]
    },
    sitemap: `${NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  }
} 