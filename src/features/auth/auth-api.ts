import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  // baseURL:
  //   process.env.NODE_ENV === 'development'
  //     ? 'http://localhost:7542/2.0/'
  //     : 'https://neko-back.herokuapp.com/2.0/',
  // withCredentials: true,
})

// export const authAPI = {
//     login(data: LoginParamsType) {
//         return instance.post<ResponseType<{ userId?: number }>>("auth/login", data);
//     },
//     logout() {
//         return instance.delete<ResponseType<{ userId?: number }>>("auth/login");
//     },
//     me() {
//         return instance.get<
//             ResponseType<{ id: number; email: string; login: string }>
//             >("auth/me");
//     },
// };

export const authAPI = {
  login(data: any) {
    return instance.post<LoginPayloadType, AxiosResponse<LoginResponseType>>('auth/login', data)
  },
}

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
