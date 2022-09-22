import { format, isBefore } from 'date-fns'

export namespace DateUtils {
  export const getDayOfWeek = (dateTime: string) => format(new Date(dateTime), 'EEEE')
  export const getDayOfWeekAndDate = (dateTime: string) => format(new Date(dateTime), 'EEEE do')

  export const isPast = (dateTime: string) => isBefore(new Date(dateTime), new Date())

  export const getDateFormat = (date: string) => {
    return format(new Date(date), "do 'of' MMMM yyyy")
  }

  export const getDateRangeFormat = (dateTime: string, time: number) => {
    const date = new Date(dateTime)
    const endDate = new Date(date).setMinutes(date.getMinutes() + time)

    return `${format(date, 'EEEE do MMMM HH:mm')} – ${format(endDate, 'HH:mm')}`
  }

  export const getEndtime = (dateTime: string, time: number) => {
    const date = new Date(dateTime)
    return new Date(date).setMinutes(date.getMinutes() + time)
  }

  export const getTimeRange = (dateTime: string, time: number) => {
    const date = new Date(dateTime)
    const endDate = getEndtime(dateTime, time)

    return `${format(date, 'HH:mm')} – ${format(endDate, 'HH:mm')}`
  }

  export const isFinished = (dateTime: string, time: number) => {
    const endDate = getEndtime(dateTime, time)

    return isBefore(endDate, new Date())
  }

  export const dateStringToUnix = (dateTime: string) => new Date(dateTime).getTime()
  export const unixToHour = (unix: number) => parseInt(format(new Date(unix), 'HH'), 10)
  export const dateStringToHours = (dateTime: string) => parseInt(format(new Date(dateTime), 'HH'), 10)
  export const dateStringToMinutes = (dateTime: string) => parseInt(format(new Date(dateTime), 'mm'), 10)
  export const dateStringToHoursAndMinutes = (dateTime: string) => {
    const hours = dateStringToHours(dateTime)
    const minutes = dateStringToMinutes(dateTime)
    return hours + minutes / 60
  }
}
