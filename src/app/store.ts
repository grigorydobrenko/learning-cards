import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { authReducer } from '../features/auth/auth-reducer'

import { appReducer } from './app-reducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store

export type AppRootState = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootState, any, AnyAction>
