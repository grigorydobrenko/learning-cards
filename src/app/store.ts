import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

import { appReducer } from './app-reducer'

const rootReducer = combineReducers({
  appReducer: appReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store

export type AppRootState = ReturnType<typeof rootReducer>
