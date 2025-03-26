import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // Valor padrão caso a variável de ambiente não esteja disponível
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

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
    sitemap: `${siteUrl}/sitemap.xml`,
  }
} 