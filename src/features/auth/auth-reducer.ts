import axios, { AxiosError } from 'axios'

import { AppThunk } from '../../app/store'

import { authAPI } from './auth-api'
import { LoginPayloadType } from './Login/Login'

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
      const res = await authAPI.login(data)

      dispatch(setIsLoggedInAC(true))
      // dispatch(setAppStatusAC('succeeded'))
      // } else {
      //   handleServerAppError(dispatch, res.data)
      // }
    } catch (e) {
      const err = e as Error | AxiosError

      if (axios.isAxiosError(err)) {
        const error = err.response
          ? err.response.data.error
          : err.message + ', more details in the console'

        throw new Error(error)
      }

      // const err = e as Error | AxiosError
      //
      // if (axios.isAxiosError(err)) {
      //   handleServerNetWorkError(dispatch, err)
      // }
      // const error = e.response ? e.response.data.error : e.message + ', more details in the console'
    }
  }

type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({
  type: 'login/SET-IS-LOGGED-IN',
  isLoggedIn,
})

//НЕ понядобятся: isAdmin,verified, __v, token, tokenDeathTime,
