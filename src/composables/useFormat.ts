import { NO_DATA_DUMMY, NULL_DATA_DUMMY } from '@/constants'

export const useFormat = () => {
  const checkUnknownData = (data: number | string | boolean | undefined | null) => {
    if (data === undefined) return { data: NO_DATA_DUMMY, status: false }
    if (data === null) return { data: NULL_DATA_DUMMY, status: false }
    return { data, status: true }
  }

  const ISO_OFFSET_REGEX =
    /^(\d{4})-(\d{2})-(\d{2})T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(?:\.\d{1,6})?(Z|[+-]([01]\d|2[0-3]):[0-5]\d)$/

  const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0

  const isValidIsoDate = (input: string): boolean => {
    const m = ISO_OFFSET_REGEX.exec(input)
    if (!m) return false

    const year = Number(m[1])
    const month = Number(m[2]) // 1..12
    const day = Number(m[3]) // 1..31

    if (month < 1 || month > 12) return false

    const monthDays = [31, isLeap(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (day < 1 || day > monthDays[month - 1]) return false

    // Часы/минуты/секунды уже ограничены в RegExp
    return true
  }

  const toReadableDate = (dataString: string) => {
    const { data, status } = checkUnknownData(dataString)
    if (!status) return data
    const date = new Date(dataString)
    const y = date.getUTCFullYear()
    const m = String(date.getUTCMonth() + 1).padStart(2, '0') // месяцы с 0
    const d = String(date.getUTCDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }

  const getProcessedValue = (val: number | string | boolean | undefined | null) => {
    const { data, status } = checkUnknownData(val)
    if (!status) return data

    switch (typeof data) {
      case 'boolean':
        return data ? '✓' : '⨉'
      case 'number':
        return data
      case 'string':
        if (isValidIsoDate(data)) return toReadableDate(data)
        return data
    }
  }

  return {
    isValidIsoDate,
    toReadableDate,
    checkUnknownData,
    getProcessedValue,
  }
}
