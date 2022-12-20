import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { authActionType, authReducer } from '../features/auth/auth-reducer'
import { packsReducer, packsReducerActionType } from '../features/packs/packs-reducer'

import { appReducer, appReducerActionsType } from './app-reducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  packs: packsReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store

export type AppRootState = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootState, any, AppActionsType>
export type AppActionsType = authActionType | appReducerActionsType | packsReducerActionType
//type for thunk
export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootState,
  unknown,
  AppActionsType
>

// @ts-ignore
window.store = store
