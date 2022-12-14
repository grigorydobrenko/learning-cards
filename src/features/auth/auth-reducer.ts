import { AppThunkDispatch, AppThunkType } from '../../app/store'

import { registrationAPI, RegistrationDataType } from './auth-api'

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

export const registrationTC =
  (data: RegistrationDataType): AppThunkType =>
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

//TYPES
export type RegisteredActionType = ReturnType<typeof setIsRegisteredInAC>
type InitialStateType = {
  isRegisteredIn: boolean
  isLoggedIn: boolean
}
