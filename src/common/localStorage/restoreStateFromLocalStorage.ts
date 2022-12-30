export function restoreStateFromLocalStorage<T>(key: string, defaultState: T) {
  let state = defaultState
  const stateAsString = localStorage.getItem(key)

  if (stateAsString !== null) {
    state = JSON.parse(stateAsString) as T
    //dispatch(setUserIdAC(state))
  }

  return state
}

export const loadState = (key: string) => {
  try {
    // let localStorageValue = localStorage.getItem(key)
    //
    // if (localStorageValue) {
    //   dispatch(setUserIdAC(localStorageValue))
    // }
    const serializedState = localStorage.getItem(key)

    if (serializedState === null) {
      return undefined
    }

    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}
