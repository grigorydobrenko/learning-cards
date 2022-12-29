// export function restoreStateFromLocalStorage<T>(key: string, defaultState: T) {
//   let state = defaultState
//   const stateAsString = localStorage.getItem(key)
//
//   if (stateAsString !== null) state = JSON.parse(stateAsString) as T
//
//   return state
// }

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')

    if (serializedState === null) {
      return undefined
    }

    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}
