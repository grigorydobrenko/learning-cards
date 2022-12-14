import { AxiosError } from 'axios'

import { AppThunk } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'

import { authAPI, LoginPayloadType } from './auth-api'

const initialState = {
  isLoggedIn: false,
}

export const authReducer = (
  state: InitialStateType = initialState,
  action: setIsLoggedInACType
): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.isLoggedIn }
    default:
      return state
  }
}

type InitialStateType = typeof initialState

export const loginTC =
  (data: LoginPayloadType): AppThunk =>
  async dispatch => {
    // dispatch(setAppStatusAC('loading'))
    try {
      await authAPI.login(data)

      dispatch(setIsLoggedInAC(true))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    }
  }

type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({
  type: 'login/SET-IS-LOGGED-IN',
  isLoggedIn,
})
