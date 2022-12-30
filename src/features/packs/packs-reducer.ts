import { AxiosError } from 'axios'

import { PacksResponseType, packsTableAPI } from './packs-api'

import { setAppStatusAC } from 'app/app-reducer'
import { AppThunkType } from 'app/store'
import { errorUtils } from 'common/utils/error-utils'

const InitialState: InitialStateType = {
  cardPacks: [],
  page: 1,
  pageCount: 50,
  sortPacks: '0updated',
  packName: '',
  isMyPacks: null,
  min: 0,
  max: 20,
  user_id: '',
}

export const packsReducer = (
  state: InitialStateType = InitialState,
  action: packsReducerActionType
): InitialStateType => {
  switch (action.type) {
    case 'packs/SET-PACKS':
      return { ...state, ...action.data }
    case 'packs/CHANGE-PACK-ENTITY-STATUS':
      return {
        ...state,
        cardPacks: state.cardPacks.map(pack =>
          pack._id === action.packId ? { ...pack, entityStatus: action.entityStatus } : pack
        ),
      }
    case 'packs/SET-MIN-CARDS-COUNT':
      return { ...state, min: action.minCount }
    case 'packs/SET-MAX-CARDS-COUNT':
      return { ...state, max: action.maxCount }
    case 'packs/SET-SEARCH-DATA':
      return { ...state, packName: action.packName }
    case 'packs/SET-USER-ID':
      return { ...state, user_id: action.user_id }
    case 'packs/SET-IS-MY-PACKS':
      return { ...state, isMyPacks: action.isMyPacks }

    default:
      return state
  }
}

//ACTIONS========================================

export const setPacksDataAC = (data: PacksResponseType) =>
  ({ type: 'packs/SET-PACKS', data } as const)
export const changePackEntityStatusAC = (packId: string, entityStatus: EntityStatusType) =>
  ({ type: 'packs/CHANGE-PACK-ENTITY-STATUS', entityStatus, packId } as const)
export const setMinCardsCountAC = (minCount: number) =>
  ({ type: 'packs/SET-MIN-CARDS-COUNT', minCount } as const)
export const setMaxCardsCountAC = (maxCount: number) =>
  ({ type: 'packs/SET-MAX-CARDS-COUNT', maxCount } as const)
export const setSearchDataAC = (packName: string) =>
  ({ type: 'packs/SET-SEARCH-DATA', packName } as const)
export const setUserIdAC = (user_id: string) => ({ type: 'packs/SET-USER-ID', user_id } as const)
export const setIsMyPacksAC = (isMyPacks: string | null) =>
  ({ type: 'packs/SET-IS-MY-PACKS', isMyPacks } as const)

//THUNKS =========================================

export const getPacksTC = (): AppThunkType => async (dispatch, getState) => {
  let { pageCount, page, packName, min, max, user_id } = getState().packs

  dispatch(setAppStatusAC('loading'))
  try {
    const response = await packsTableAPI.getPacks({
      packName,
      pageCount,
      page,
      min,
      max,
      user_id,
    })

    dispatch(setPacksDataAC(response.data))

    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    errorUtils(err, dispatch)
    dispatch(setAppStatusAC('failed'))
  }
}

export const addNewPackTC =
  (name: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))

    try {
      await packsTableAPI.createNewPack({ cardsPack: { name } })
      await dispatch(getPacksTC())
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }

export const updatePackTC =
    (_id: string, name: string): AppThunkType =>
        async dispatch => {
          dispatch(setAppStatusAC('loading'))
          dispatch(changePackEntityStatusAC(_id, 'loading'))

          try {
            await packsTableAPI.updatePack({ cardsPack: { _id, name } })
            await dispatch(getPacksTC())
            dispatch(setAppStatusAC('succeeded'))
            dispatch(changePackEntityStatusAC(_id, 'succeeded'))
          } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>

            errorUtils(err, dispatch)
            dispatch(setAppStatusAC('failed'))
            dispatch(changePackEntityStatusAC(_id, 'failed')
          }
        }

export const deletePackTC =
    (id: string): AppThunkType =>
        async dispatch => {
          dispatch(setAppStatusAC('loading'))
          dispatch(changePackEntityStatusAC(id, 'loading'))

          try {
            await packsTableAPI.deletePack(id)
            await dispatch(getPacksTC())
            dispatch(setAppStatusAC('succeeded'))
            dispatch(changePackEntityStatusAC(id, 'succeeded'))
          } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>

            errorUtils(err, dispatch)
            dispatch(setAppStatusAC('failed'))
            dispatch(changePackEntityStatusAC(id, 'failed'))
          }
        }

//TYPES ==========================================

type InitialStateType = {
  cardPacks: Array<CardPacksType>
  page: number
  pageCount: number
  sortPacks: string
  packName: string
  isMyPacks: string | null
  min: number
  max: number
  user_id: string
}
export type CardPacksType = {
  cardsCount: number
  created: string
  deckCover: null | number
  grade: number
  more_id: string
  name: string
  path: string
  private: boolean
  rating: number
  shots: number
  type: string
  updated: string
  user_id: string
  user_name: string
  __v: number
  _id: string
  entityStatus: EntityStatusType
}

type EntityStatusType = 'loading' | 'succeeded' | 'idle' | 'failed'

export type packsReducerActionType =
  | setPacksDataACType
  | setEntityStatusACType
  | setMinCardsCountACType
  | setMaxCardsCountACType
  | setSearchDataACType
  | setUserIdACType
  | setIsMyPacksACType
export type setPacksDataACType = ReturnType<typeof setPacksDataAC>
export type setEntityStatusACType = ReturnType<typeof changePackEntityStatusAC>
export type setMinCardsCountACType = ReturnType<typeof setMinCardsCountAC>
export type setMaxCardsCountACType = ReturnType<typeof setMaxCardsCountAC>
export type setSearchDataACType = ReturnType<typeof setSearchDataAC>
export type setUserIdACType = ReturnType<typeof setUserIdAC>
export type setIsMyPacksACType = ReturnType<typeof setIsMyPacksAC>
