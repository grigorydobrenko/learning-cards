import {AppRootState, AppThunkType} from './../../app/store'
import { AxiosError } from 'axios'

import { setAppStatusAC, setUserDataAC } from '../../app/app-reducer'
import { AppThunkDispatch } from '../../app/store'
// import { errorUtils } from '../../common/utils/error-utils'

import { authAPI, LoginPayloadType } from './auth-api'

import axios from 'axios'


const InitialState: InitialStateType = {
  isLoggedIn: false,
  isRegisteredIn: false,
}

export const authReducer = (
  state: InitialStateType = InitialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    case 'login/SET-IS-REGISTERED-IN':
      return { ...state, isRegisteredIn: action.value }
    default:
      return state
  }
}

export const setIsLoggedInAC = (isLoggedIn: boolean) => ({
  type: 'login/SET-IS-LOGGED-IN',
  isLoggedIn,
})

export const setIsRegisteredInAC = (value: boolean) =>
    ({ type: 'login/SET-IS-REGISTERED-IN', value } as const)



export const loginTC =
  (data: LoginPayloadType): AppThunkType =>
  async (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
      const response = await authAPI.login(data)

      dispatch(setIsLoggedInAC(true))
      dispatch(setUserDataAC(response.data))

      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      // errorUtils(err, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }
export const updateUserDataTC =
  (data: { name?: string; avatar?: string }) =>
  (dispatch: AppThunkDispatch, getState: () => AppRootState) => {
    dispatch(setAppStatusAC('loading'))
    const state = getState()
    const user = state.app.userData
    if (!user) {
      throw new Error('user not found')
    }
    const dataToUpdate = {
      name: user.name,
      avatar: user.avatar,
      ...data,
    }
    authAPI
      .updateUserData(dataToUpdate)
      .then(res => {
        dispatch(setUserDataAC(res.data.updatedUser))
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch(e => {
        console.log(e)
      })
  }
export const logoutTC = () => (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatusAC('loading'))
  authAPI
    .logout()
    .then(res => {
      dispatch(setIsLoggedInAC(false))
      dispatch(setAppStatusAC('succeeded'))
    })
    .catch(error => {
      // handleServerNetworkAppError(error, dispatch);
    })
}


export const registrationTC =
  (data: ValuesFromRegistrationType): AppThunkType =>
  (dispatch: AppThunkDispatch) => {
    let dataForServer = {
      email: data.email,
      password: data.password,
    }

    registrationAPI
      .registration(dataForServer)
      .then(response => {
        console.log(response)
        dispatch(setIsRegisteredInAC(true))
      })
      .catch(error => {
        console.log(error)
      })
  }

export const sendEmailToSetNewPasswordTC =
  (data: dataFromForgotPasswordType): AppThunkType =>
  (dispatch: AppThunkDispatch) => {
    let dataToChangePassword: ForgotPasswordType = {
      email: data.email,
      from: 'test-front-admin <seo.spb2015@yandex.ru>',
      message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/forgot-password/$token$'>
link</a>
</div>`,
    }
    axios
      .post('https://neko-back.herokuapp.com/2.0/auth/forgot', dataToChangePassword)
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

//TYPES
export type RegisteredActionType = ReturnType<typeof setIsRegisteredInAC>
type dataFromForgotPasswordType = {
  email: string
}
export type ValuesFromRegistrationType = {
  fistName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  allowExtraEmails: boolean
}
type InitialStateType = {
  isRegisteredIn: boolean
  isLoggedIn: boolean
}

type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
