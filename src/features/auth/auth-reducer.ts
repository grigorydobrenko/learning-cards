import { AppRootState } from './../../app/store'
import { AxiosError } from 'axios'

import { setAppStatusAC, setUserDataAC } from '../../app/app-reducer'
import { AppThunkDispatch } from '../../app/store'
// import { errorUtils } from '../../common/utils/error-utils'

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
  (data: LoginPayloadType): AppThunkDispatch =>
  // @ts-ignore
  async dispatch => {
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
    if (!user) throw new Error('user not found')
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
type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({
  type: 'login/SET-IS-LOGGED-IN',
  isLoggedIn,
})
