export namespace Logs {
  type LogLevel = 'info' | 'error' | 'success' | 'warning'
  type LogFunction = (message: string) => void

  type Logger = {
    [key in LogLevel]: LogFunction
  }

  export const createLogger: (name: string) => Logger = (name) => {
    const log = (type, message) => {
      // eslint-disable-next-line no-console
      console.log(`[${type}] ${name} - ${message}`)
    }

    return {
      error: (message) => log('error', message),
      info: (message) => log('info', message),
      success: (message) => log('success', message),
      warning: (message) => log('warning', message),
    }
  }
}
