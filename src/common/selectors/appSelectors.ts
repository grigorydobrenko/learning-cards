import { AppRootState } from '../../app/store'

export const user = (state: AppRootState) => state.app.userData

export const status = (state: AppRootState) => state.app.status

export const error = (state: AppRootState) => state.app.error

export const feedBack = (state: AppRootState) => state.app.feedBack

export const isInitialized = (state: AppRootState) => state.app.isInitialized
export const theme = (state: AppRootState) => state.app.theme
