import { env } from '@/env'

const isDevelopment = env.NODE_ENV === 'development'

type LogLevel = 'info' | 'warn' | 'error'

interface LogOptions {
  sensitive?: boolean
  prefix?: string
  data?: Record<string, unknown>
  error?: unknown
}

class Logger {
  private static log(level: LogLevel, message: string, options: LogOptions = {}) {
    if (!isDevelopment) return

    const prefix = options.prefix ? `[${options.prefix}] ` : ''
    const fullMessage = `${prefix}${message}`

    const hasData = options.data || options.error
    const logData = hasData ? [fullMessage, options] : [fullMessage]

    switch (level) {
      case 'info':
        console.log(...logData)
        break
      case 'warn':
        console.warn(...logData)
        break
      case 'error':
        console.error(...logData)
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
    this.log('error', message, options)
  }
}

export default Logger 