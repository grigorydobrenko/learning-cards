import { AxiosResponse } from 'axios'

import { instance } from 'common/instance/instance'

export const authAPI = {
  login(data: LoginPayloadType) {
    return instance.post<'', AxiosResponse<UserResponseType>, LoginPayloadType>('auth/login', data)
  },
  logout() {
    return instance.delete<{ info: string; error: string }>('auth/me')
  },
  me() {
    return instance.post<UserResponseType>('auth/me', {})
  },
  updateUserData(data: { name: string; avatar: string }) {
    return instance.put<
      '',
      AxiosResponse<UpdateUserDataResponseType>,
      { name: string; avatar: string }
    >('auth/me', data)
  },
}

export const registrationAPI = {
  registration(data: RegistrationDataType) {
    return instance.post<RegistrationDataType>('/auth/register', data)
  },
  forgotPassword(data: ForgotPasswordType) {
    return instance.post<ForgotPasswordResponseType>('/auth/forgot', data)
  },
  setNewPassword(data: SetNewPasswordType) {
    return instance.post<{ info: string }>('/auth/set-new-password', data)
  },
}

//TYPES ==================================

export type LoginPayloadType = {
  email: string
  password: string
  rememberMe: boolean
}

export type UserResponseType = {
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
  updatedUser: UserResponseType
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

export type ForgotPasswordResponseType = {
  answer: boolean
  html: boolean
  info: string
  success: boolean
}

export type SetNewPasswordType = {
  password: string
  resetPasswordToken: string
}
