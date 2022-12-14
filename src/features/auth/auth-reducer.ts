import { AppThunkDispatch, AppThunkType } from '../../app/store'

import { registrationAPI, RegistrationDataType } from './auth-api'

export const authReducer = (state: any, action: any): any => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    default:
      return state
  }
}

export const registrationTC =
  (data: RegistrationDataType): AppThunkType =>
  (dispatch: AppThunkDispatch) => {
    let dataForServer = {
      email: data.email,
      password: data.password,
    }

    registrationAPI.registration(dataForServer).then(responce => console.log(responce))
  }
