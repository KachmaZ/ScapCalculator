export const useLS = () => {
  const saveToLS = (key: string, value: string) => {
    localStorage.setItem(key, value)
  }

  const getStringFromLS = (key: string) => {
    return localStorage.getItem(key)
  }

  const getJSONFromLS = (key: string) => {
    return JSON.parse(localStorage.getItem(key) ?? '')
  }

  const removeFromLS = (key: string) => {
    localStorage.removeItem(key)
  }

  const clearLS = () => {
    localStorage.clear()
  }

  return {
    saveToLS,
    getStringFromLS,
    getJSONFromLS,
    removeFromLS,
    clearLS,
  }
}
