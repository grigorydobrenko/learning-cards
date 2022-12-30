import { AxiosError } from 'axios'

import { authAPI, ForgotPasswordType, LoginPayloadType, registrationAPI } from './auth-api'

import { setAppFeedbackAC, setAppStatusAC, setUserDataAC } from 'app/app-reducer'
import { AppThunkType } from 'app/store'
import { errorUtils } from 'common/utils/error-utils'

const InitialState: InitialStateType = {
  isLoggedIn: false,
  isRegisteredIn: false,
  isNewPasswordSet: false,
}

export const authReducer = (
  state: InitialStateType = InitialState,
  action: authActionType
): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.isLoggedIn }
    case 'login/SET-IS-REGISTERED-IN':
      return { ...state, isRegisteredIn: action.value }
    case 'login/IS-NEW-PASSWORD-SET':
      return { ...state, isNewPasswordSet: action.value }
    default:
      return state
  }
}

//ACTIONS =============================================

export const setIsLoggedInAC = (isLoggedIn: boolean) =>
  ({
    type: 'login/SET-IS-LOGGED-IN',
    isLoggedIn,
  } as const)

export const setIsRegisteredInAC = (value: boolean) =>
  ({ type: 'login/SET-IS-REGISTERED-IN', value } as const)
export const setIsNewPasswordSetAC = (value: boolean) =>
  ({ type: 'login/IS-NEW-PASSWORD-SET', value } as const)

//THUNKS ==============================================

export const loginTC =
  (data: LoginPayloadType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const response = await authAPI.login(data)

      dispatch(setIsLoggedInAC(true))
      dispatch(setUserDataAC(response.data))

      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }

export const updateUserDataTC =
  (data: { name?: string; avatar?: string }): AppThunkType =>
  (dispatch, getState) => {
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
        const err = e as Error | AxiosError<{ error: string }>

        errorUtils(err, dispatch)
        dispatch(setAppStatusAC('failed'))
      })
  }

export const logoutTC = (): AppThunkType => dispatch => {
  dispatch(setAppStatusAC('loading'))
  authAPI
    .logout()
    .then(res => {
      dispatch(setIsLoggedInAC(false))
      dispatch(setAppStatusAC('idle'))
    })
    .catch(e => {
      const err = e as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
      dispatch(setAppStatusAC('failed'))
    })
}

export const registrationTC =
  (data: ValuesFromRegistrationType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    let dataForServer = {
      email: data.email,
      password: data.password,
    }

    try {
      const response = await registrationAPI.registration(dataForServer)

      console.log(response)
      dispatch(setIsRegisteredInAC(true))
      dispatch(setAppStatusAC('succeeded'))
      dispatch(setAppFeedbackAC('Congratulations! You is registered!'))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }

export const sendEmailToSetNewPasswordTC =
  (data: dataFromForgotPasswordType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    let url =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://grigorydobrenko.github.io/learning-cards'

    let dataToChangePassword: ForgotPasswordType = {
      email: data.email,
      from: 'test-front-admin <seo.spb2015@yandex.ru>',
      message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href=${url}/#/create-password/$token$>
link</a>
</div>`,
    }

    try {
      let response = await registrationAPI.forgotPassword(dataToChangePassword)

      dispatch(setAppStatusAC('succeeded'))
      dispatch(setIsRegisteredInAC(false))
      dispatch(setIsNewPasswordSetAC(false))
      dispatch(setAppFeedbackAC(response.data.info))
      console.log(response)
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }

export const setNewPasswordTC =
  (data: setNewPasswordType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const response = await registrationAPI.setNewPassword(data)

      dispatch(setIsNewPasswordSetAC(true))
      dispatch(setIsRegisteredInAC(false))
      dispatch(setAppStatusAC('idle'))
      dispatch(setAppFeedbackAC(response.data.info))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }

//TYPES ========================================

export type setNewPasswordType = {
  password: string
  resetPasswordToken: string
}

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
  isNewPasswordSet: boolean
}

export type authActionType =
  | setIsLoggedInACType
  | setIsRegisteredInACType
  | setIsNewPasswordSetACType
type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
type setIsRegisteredInACType = ReturnType<typeof setIsRegisteredInAC>
type setIsNewPasswordSetACType = ReturnType<typeof setIsNewPasswordSetAC>
