import axios from 'axios'

import { AppThunkDispatch, AppThunkType } from '../../app/store'

import { ForgotPasswordType, registrationAPI } from './auth-api'

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

export const setIsRegisteredInAC = (value: boolean) =>
  ({ type: 'login/SET-IS-REGISTERED-IN', value } as const)

//THUNKS
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
