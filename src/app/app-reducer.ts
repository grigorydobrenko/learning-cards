export type initStateType = {
  error: null | string
}

const initState: initStateType = {
  error: null as null | string,
}

export const appReducer = (state = initState, action: appReducerActionsType): initStateType => {
  switch (action.type) {
    case 'APP/SET-ERROR': {
      return { ...state, error: action.error }
    }
    default:
      return state
  }
}

export const setAppErrorAC = (error: null | string) => {
  return {
    type: 'APP/SET-ERROR',
    error,
  }
}

type appReducerActionsType = setAppErrorACType
export type setAppErrorACType = ReturnType<typeof setAppErrorAC>
