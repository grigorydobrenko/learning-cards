import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { authReducer } from '../features/auth/auth-reducer'

import { appReducer } from './app-reducer'
import {authActionType} from "../features/auth/auth-reducer";

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store

export type AppRootState = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootState, any, AnyAction>
export type AppActionsType = authActionType
//type for thunk
export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootState,
  unknown,
  AppActionsType
>

// @ts-ignore
window.store = store
