export function setToLocalStorage<T>(key: string, data: T): void {
  const dataString = JSON.stringify(data)
  localStorage.setItem(key, dataString)
}

export function getFromLocalStorage<T>(key: string): T | null {
  const dataString = localStorage.getItem(key)
  if (!dataString) return null

  return JSON.parse(dataString) as T
}
