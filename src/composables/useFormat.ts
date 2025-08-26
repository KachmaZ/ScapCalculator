import { NO_DATA_DUMMY, NULL_DATA_DUMMY } from '@/constants'

export const useFormat = () => {
  const checkUnknownData = (data: number | string | boolean | undefined | null) => {
    if (data === undefined) return { data: NO_DATA_DUMMY, status: false }
    if (data === null) return { data: NULL_DATA_DUMMY, status: false }
    return { data, status: true }
  }

  const isValidDate = (dateString: string) => {
    return !isNaN(Date.parse(dateString))
  }

  const toReadableDate = (dataString: string) => {
    const { data, status } = checkUnknownData(dataString)
    if (!status) return data
    return new Date(dataString).toLocaleDateString('en-GB')
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
        if (isValidDate(data)) return toReadableDate(data)
        return data
    }
  }

  return {
    isValidDate,
    toReadableDate,
    checkUnknownData,
    getProcessedValue,
  }
}
