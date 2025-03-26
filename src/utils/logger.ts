import { env } from '@/env'

const isDevelopment = env.NODE_ENV === 'development'

type LogLevel = 'info' | 'warn' | 'error'

interface LogOptions {
  sensitive?: boolean
  prefix?: string
}

class Logger {
  private static log(level: LogLevel, message: string, options: LogOptions = {}) {
    if (!isDevelopment && options.sensitive) return

    const prefix = options.prefix ? `[${options.prefix}] ` : ''
    const fullMessage = `${prefix}${message}`

    switch (level) {
      case 'info':
        console.log(fullMessage)
        break
      case 'warn':
        console.warn(fullMessage)
        break
      case 'error':
        console.error(fullMessage)
        break
    }
  }

  static info(message: string, options: LogOptions = {}) {
    this.log('info', message, options)
  }

  static warn(message: string, options: LogOptions = {}) {
    this.log('warn', message, options)
  }

  static error(message: string, options: LogOptions = {}) {
    this.log('error', message, { ...options, sensitive: false }) // Erros sempre são logados
  }
}

export default Logger 