const initState: initStateType = {
  status: 'idle',
  error: null,
}

export const appReducer = (state = initState, action: appReducerActionsType): initStateType => {
  switch (action.type) {
    case 'APP/SET-ERROR': {
      return { ...state, error: action.error }
    }
    case 'APP/SET-STATUS': {
      return { ...state, status: action.status }
    }
    default:
      return state
  }
}

export const setAppErrorAC = (error: null | string) => ({ type: 'APP/SET-ERROR', error } as const)
export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: 'APP/SET-STATUS', status } as const)

export type initStateType = {
  status: RequestStatusType
  error: null | string
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type appReducerActionsType = setAppErrorACType | setAppStatusACType
export type setAppErrorACType = ReturnType<typeof setAppErrorAC>
export type setAppStatusACType = ReturnType<typeof setAppStatusAC>
