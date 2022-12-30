export function saveStateToLocalStorage<T>(key: string, state: T) {
  const stateAsString = JSON.stringify(state)

  localStorage.setItem(key, stateAsString)
}

// export const saveState = (state: string) => {
//   try {
//     const serializedState = JSON.stringify(state)
//
//     localStorage.setItem('state', serializedState)
//   } catch {
//     // ignore write errors
//   }
// }
