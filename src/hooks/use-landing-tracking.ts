import { useEffect } from 'react'
import { logAnalyticsEvent } from '@/lib/firebase-client'
import { COMMON_PARAMS, LANDING_EVENTS } from '@/constants/analytics'

type LandingType = 'home' | 'clients' | 'lawyers'

export function useLandingTracking(type: LandingType) {
  useEffect(() => {
    // Obtém informações regionais seguras
    const locale = navigator.language || 'unknown'
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown'
    const preferredLanguages = navigator.languages?.join(', ') || 'unknown'

    // Registra evento específico da landing
    logAnalyticsEvent(LANDING_EVENTS.VIEW, {
      [COMMON_PARAMS.PAGE]: type,
      [COMMON_PARAMS.LANDING_TYPE]: type,
      [COMMON_PARAMS.SESSION_ID]: Math.random().toString(36).substring(2),
      [COMMON_PARAMS.VISIT_TIME]: new Date().toISOString(),
      [COMMON_PARAMS.DEVICE_TYPE]: window.innerWidth < 768 ? 'mobile' : 'desktop',
      [COMMON_PARAMS.SCREEN_SIZE]: `${window.innerWidth}x${window.innerHeight}`,
      [COMMON_PARAMS.USER_AGENT]: window.navigator.userAgent,
      [COMMON_PARAMS.LANGUAGE]: locale,
      [COMMON_PARAMS.TIMEZONE]: timeZone,
      [COMMON_PARAMS.PREFERRED_LANGUAGES]: preferredLanguages,
      [COMMON_PARAMS.REFERRER]: document.referrer || 'direct'
    })

    // Configura rastreamento de scroll
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

      if (scrollPercentage >= 25) {
        logAnalyticsEvent(LANDING_EVENTS.SCROLL_25, {
          [COMMON_PARAMS.LANDING_TYPE]: type,
          [COMMON_PARAMS.VISIT_TIME]: new Date().toISOString()
        })
      }
      if (scrollPercentage >= 50) {
        logAnalyticsEvent(LANDING_EVENTS.SCROLL_50, {
          [COMMON_PARAMS.LANDING_TYPE]: type,
          [COMMON_PARAMS.VISIT_TIME]: new Date().toISOString()
        })
      }
      if (scrollPercentage >= 75) {
        logAnalyticsEvent(LANDING_EVENTS.SCROLL_75, {
          [COMMON_PARAMS.LANDING_TYPE]: type,
          [COMMON_PARAMS.VISIT_TIME]: new Date().toISOString()
        })
      }
      if (scrollPercentage >= 90) {
        logAnalyticsEvent(LANDING_EVENTS.SCROLL_90, {
          [COMMON_PARAMS.LANDING_TYPE]: type,
          [COMMON_PARAMS.VISIT_TIME]: new Date().toISOString()
        })
      }
    }

    // Configura rastreamento de tempo na página
    const startTime = Date.now()
    const timeInterval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000) // tempo em segundos
      if (timeSpent === 30) {
        logAnalyticsEvent(LANDING_EVENTS.TIME_30S, {
          [COMMON_PARAMS.LANDING_TYPE]: type,
          [COMMON_PARAMS.VISIT_TIME]: new Date().toISOString()
        })
      }
      if (timeSpent === 60) {
        logAnalyticsEvent(LANDING_EVENTS.TIME_60S, {
          [COMMON_PARAMS.LANDING_TYPE]: type,
          [COMMON_PARAMS.VISIT_TIME]: new Date().toISOString()
        })
      }
      if (timeSpent === 180) {
        logAnalyticsEvent(LANDING_EVENTS.TIME_180S, {
          [COMMON_PARAMS.LANDING_TYPE]: type,
          [COMMON_PARAMS.VISIT_TIME]: new Date().toISOString()
        })
      }
    }, 1000)

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(timeInterval)
    }
  }, [type])
} 