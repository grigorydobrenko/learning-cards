import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { authActionType, authReducer } from '../features/auth/auth-reducer'
import { cardsReducer, cardsReducerActionsType } from '../features/cards/cards-reducer'
import { packsReducer, packsReducerActionType } from '../features/packs/packs-reducer'

import { appReducer, appReducerActionsType } from './app-reducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  packs: packsReducer,
  cards: cardsReducer,
})

const store = createStore(
  rootReducer,
  // restoreStateFromLocalStorage('userId', {}),
  // loadState('userId'),
  applyMiddleware(thunk)
)

// store.subscribe(() => {
//   //saveStateToLocalStorage('isMyPack', store.getState().packs.isMyPacks)
// })

export default store

export type AppRootState = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootState, any, AppActionsType>
export type AppActionsType =
  | authActionType
  | appReducerActionsType
  | cardsReducerActionsType
  | packsReducerActionType
//type for thunk
export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootState,
  unknown,
  AppActionsType
>

// @ts-ignore
window.store = store
