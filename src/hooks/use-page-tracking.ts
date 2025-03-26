import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

import { logAnalyticsEvent } from '@/lib/firebase-client'
import { NAVIGATION_EVENTS, COMMON_PARAMS } from '@/constants/analytics'

export function usePageTracking() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Obtém a URL completa incluindo query params
    const fullUrl = searchParams?.size
      ? `${pathname}?${searchParams.toString()}`
      : pathname

    // Obtém informações do dispositivo/navegador
    const screenSize = typeof window !== 'undefined'
      ? `${window.innerWidth}x${window.innerHeight}`
      : 'unknown'

    const userAgent = typeof window !== 'undefined'
      ? window.navigator.userAgent
      : 'unknown'

    // Obtém informações regionais seguras
    const locale = navigator.language || 'unknown'
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown'
    const preferredLanguages = navigator.languages?.join(', ') || 'unknown'

    // Registra o evento de visualização de página
    logAnalyticsEvent(NAVIGATION_EVENTS.PAGE_VIEW, {
      [COMMON_PARAMS.PAGE]: pathname,
      full_url: fullUrl,
      screen_size: screenSize,
      referrer: document.referrer || 'direct',
      user_agent: userAgent,
      language: locale,
      timezone: timeZone,
      preferred_languages: preferredLanguages,
      timestamp: new Date().toISOString()
    })
  }, [pathname, searchParams])
} 