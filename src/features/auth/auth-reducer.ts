import axios, { AxiosError } from 'axios'

import { setAppErrorAC } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'

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

      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message

        dispatch(setAppErrorAC(error))
      }
    }
  }

type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({
  type: 'login/SET-IS-LOGGED-IN',
  isLoggedIn,
})

//НЕ понядобятся: isAdmin,verified, __v, token, tokenDeathTime,
