// Eventos de Autenticação
export const AUTH_EVENTS = {
  LOGIN: 'login',
  LOGIN_ERROR: 'login_error',
  LOGOUT: 'logout',
  LOGOUT_ERROR: 'logout_error',
  SIGNUP: 'sign_up',
  SIGNUP_ERROR: 'sign_up_error',
} as const

// Eventos de Casos
export const CASE_EVENTS = {
  CREATED: 'case_created',
  CREATION_ERROR: 'case_creation_error',
  ACCEPTED: 'case_accepted',
  ACCEPT_ERROR: 'case_accept_error',
  UPDATED: 'case_updated',
  CLOSED: 'case_closed',
} as const

// Eventos de Assinatura
export const SUBSCRIPTION_EVENTS = {
  STARTED: 'subscription_started',
  COMPLETED: 'subscription_completed',
  ERROR: 'subscription_error',
  CANCELLED: 'subscription_cancelled',
  RENEWED: 'subscription_renewed',
} as const

// Eventos de Navegação
export const NAVIGATION_EVENTS = {
  PAGE_VIEW: 'page_view',
  BUTTON_CLICK: 'button_click',
  LINK_CLICK: 'link_click',
  MENU_OPEN: 'menu_open',
} as const

// Eventos de Landing Page
export const LANDING_EVENTS = {
  VIEW: 'landing_view',
  SCROLL_25: 'landing_scroll_25',
  SCROLL_50: 'landing_scroll_50',
  SCROLL_75: 'landing_scroll_75',
  SCROLL_90: 'landing_scroll_90',
  TIME_30S: 'landing_time_30s',
  TIME_60S: 'landing_time_60s',
  TIME_180S: 'landing_time_180s',
  CTA_CLICK: 'landing_cta_click',
  WHATSAPP_CLICK: 'landing_whatsapp_click',
  FORM_START: 'landing_form_start',
  FORM_COMPLETE: 'landing_form_complete',
  FORM_ABANDON: 'landing_form_abandon',
} as const

// Parâmetros Comuns
export const COMMON_PARAMS = {
  // Navegação
  PAGE: 'page',
  SECTION: 'section',
  BUTTON_NAME: 'button_name',
  REFERRER: 'referrer',
  VISIT_TIME: 'visit_time',

  // Usuário
  USER_TYPE: 'user_type',
  SESSION_ID: 'session_id',

  // Dispositivo
  DEVICE_TYPE: 'device_type',
  SCREEN_SIZE: 'screen_size',
  USER_AGENT: 'user_agent',

  // Regional
  LANGUAGE: 'language',
  TIMEZONE: 'timezone',
  PREFERRED_LANGUAGES: 'preferred_languages',

  // Landing
  LANDING_TYPE: 'landing_type',

  // Erros
  ERROR_TYPE: 'error_type',
  ERROR_MESSAGE: 'error_message',
} as const 
