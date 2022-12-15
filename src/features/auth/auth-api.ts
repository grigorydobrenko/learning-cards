import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  // baseURL:
  //   process.env.NODE_ENV === 'development'
  //     ? 'http://localhost:7542/2.0/'
  //     : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const authAPI = {
  login(data: LoginPayloadType) {
    return instance.post<LoginPayloadType, AxiosResponse<LoginResponseType>>('auth/login', data)
  },
  logout() {
    return instance.delete<AxiosResponse<{ info: string; error: string }>>('auth/me')
  },
  me() {
    return instance.post<{}, AxiosResponse<LoginResponseType>>('auth/me', {})
  },
  updateUserData(data: { name: string; avatar: string }) {
    return instance.put<
      { name: string; avatar: string },
      AxiosResponse<UpdateUserDataResponseType>
    >('auth/me', data)
  },
}

export const registrationAPI = {
  registration(data: RegistrationDataType) {
    return instance.post('/auth/register', data)
  },
  forgotPassword(data: ForgotPasswordType) {
    return instance.post('/auth/forgot', data)
  },
  setNewPassword(data: SetNewPasswordType) {
    return instance.post('/auth/set-new-password', data)
  },
}

//TYPES

export type LoginPayloadType = {
  email: string
  password: string
  rememberMe: boolean
}

export type LoginResponseType = {
  _id: string
  email: string
  rememberMe: boolean
  name: string
  publicCardPacksCount: number
  created: string
  updated: string
  avatar: string
}
export type UpdateUserDataResponseType = {
  updatedUser: LoginResponseType
  error?: string
}

export type RegistrationDataType = {
  email: string
  password: string
}

export type ForgotPasswordType = {
  email: string
  from: string
  message: string
}
export type SetNewPasswordType = {
  password: string
  resetPasswordToken: string
}
