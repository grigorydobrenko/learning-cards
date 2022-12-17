import { AppRootState } from '../../app/store'

export const isLoggedin = (state: AppRootState) => state.auth.isLoggedIn

export const isRegisteredIn = (state: AppRootState) => state.auth.isRegisteredIn

export const isNewPasswordSet = (state: AppRootState) => state.auth.isNewPasswordSet
