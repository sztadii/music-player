export function wait(delayInMs: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, delayInMs)
  })
}
