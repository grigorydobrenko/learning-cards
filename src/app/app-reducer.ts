import { UserResponseType, authAPI } from '../features/auth/auth-api'
import { setIsLoggedInAC } from '../features/auth/auth-reducer'

import { AppThunkType } from './store'

const initState: initStateType = {
  status: 'idle',
  error: null,
  feedBack: null,
  userData: null,
  isInitialized: false,
}

export const appReducer = (state = initState, action: appReducerActionsType): initStateType => {
  switch (action.type) {
    case 'APP/SET-ERROR': {
      return { ...state, error: action.error }
    }
    case 'APP/SET-FEEDBACK': {
      return { ...state, feedBack: action.feedBack }
    }
    case 'APP/SET-STATUS': {
      return { ...state, status: action.status }
    }
    case 'APP/SET-USER-DATA': {
      return { ...state, userData: action.userData }
    }
    case 'APP/SET-APP-INITIALIZED': {
      return { ...state, isInitialized: action.isInitialized }
    }
    default:
      return state
  }
}

//  actions============================================================

export const setAppErrorAC = (error: null | string) => ({ type: 'APP/SET-ERROR', error } as const)
export const setAppFeedbackAC = (feedBack: null | string) =>
  ({ type: 'APP/SET-FEEDBACK', feedBack } as const)
export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: 'APP/SET-STATUS', status } as const)
export const setUserDataAC = (userData: UserResponseType) =>
  ({ type: 'APP/SET-USER-DATA', userData } as const)
export const setAppInitializedAC = (value: boolean) =>
  ({ type: 'APP/SET-APP-INITIALIZED', isInitialized: value } as const)
//  thunks==============================================================

export const initializeAppTC = (): AppThunkType => dispatch => {
  authAPI
    .me()
    .then(res => {
      dispatch(setUserDataAC(res.data))
      dispatch(setIsLoggedInAC(true))
    })
    .catch(e => {
      dispatch(setAppStatusAC('failed'))
    })
    .finally(() => {
      dispatch(setAppInitializedAC(true))
    })
}

// types===========================================================

export type initStateType = {
  status: RequestStatusType
  error: null | string
  feedBack: null | string
  userData: null | UserResponseType
  isInitialized: boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type appReducerActionsType =
  | setAppErrorACType
  | setAppStatusACType
  | setUserDataACType
  | setAppInitializedACType
  | setAppFeedbackACType
export type setAppInitializedACType = ReturnType<typeof setAppInitializedAC>
export type setAppErrorACType = ReturnType<typeof setAppErrorAC>
export type setAppFeedbackACType = ReturnType<typeof setAppFeedbackAC>
export type setAppStatusACType = ReturnType<typeof setAppStatusAC>
export type setUserDataACType = ReturnType<typeof setUserDataAC>
