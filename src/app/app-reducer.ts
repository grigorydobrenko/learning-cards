import { LoginResponseType } from '../features/auth/auth-api'

const initState: initStateType = {
  status: 'idle',
  error: null,
  userData: {},
}

export const appReducer = (state = initState, action: appReducerActionsType): initStateType => {
  switch (action.type) {
    case 'APP/SET-ERROR': {
      return { ...state, error: action.error }
    }
    case 'APP/SET-STATUS': {
      return { ...state, status: action.status }
    }
    case 'APP/SET-USER-DATA': {
      return { ...state, userData: action.userData }
    }
    default:
      return state
  }
}

export const setAppErrorAC = (error: null | string) => ({ type: 'APP/SET-ERROR', error } as const)
export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: 'APP/SET-STATUS', status } as const)
export const setUserDataAC = (userData: LoginResponseType) =>
  ({ type: 'APP/SET-USER-DATA', userData } as const)

export type initStateType = {
  status: RequestStatusType
  error: null | string
  userData: {} | LoginResponseType
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type appReducerActionsType = setAppErrorACType | setAppStatusACType | setUserDataACType
export type setAppErrorACType = ReturnType<typeof setAppErrorAC>
export type setAppStatusACType = ReturnType<typeof setAppStatusAC>
export type setUserDataACType = ReturnType<typeof setUserDataAC>
