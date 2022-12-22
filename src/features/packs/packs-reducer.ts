import { AxiosError } from 'axios'

import { setAppStatusAC } from '../../app/app-reducer'
import { AppThunkType } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'

import { CardPacksType, PacksResponseType, packsTableAPI } from './packs-api'

const InitialState: InitialStateType = {
  cardPacks: [],
  cardPacksTotalCount: null,
  maxCardsCount: null,
  minCardsCount: null,
  page: null,
  pageCount: 45,
  sort: '0updated',
  packName: null,
  isMyPacks: false,
  min: 0,
  max: 20,
  user_id: null,
  token: '',
  createPackName: 'Ну как там кукуха?',
}

export const packsReducer = (
  state: InitialStateType = InitialState,
  action: packsReducerActionType
): InitialStateType => {
  switch (action.type) {
    case 'packs/SET-PACKS':
      return { ...state, ...action.data }
    case 'packs/SET-MY-PACKS':
      return { ...state, cardPacks: action.myPacks }
    case 'packs/SET-MIN-CARDS-COUNT':
      return { ...state, min: action.minCount }
    case 'packs/SET-MAX-CARDS-COUNT':
      return { ...state, max: action.maxCount }
    case 'packs/SET-SEARCH-DATA':
      return { ...state, packName: action.packName }
    case 'packs/CHANGE-SORT':
      return { ...state, sort: action.sortData }
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
export const setMyPacksDataAC = (myPacks: Array<CardPacksType>) =>
  ({ type: 'packs/SET-MY-PACKS', myPacks } as const)
export const setMinCardsCountAC = (minCount: number) =>
  ({ type: 'packs/SET-MIN-CARDS-COUNT', minCount } as const)
export const setMaxCardsCountAC = (maxCount: number) =>
  ({ type: 'packs/SET-MAX-CARDS-COUNT', maxCount } as const)
export const setSearchDataAC = (packName: string) =>
  ({ type: 'packs/SET-SEARCH-DATA', packName } as const)
export const changeSortAC = (sortData: string) => ({ type: 'packs/CHANGE-SORT', sortData } as const)
export const setUserIdAC = (user_id: string | null) =>
  ({ type: 'packs/SET-USER-ID', user_id } as const)
export const setIsMyPacksAC = (isMyPacks: boolean) =>
  ({ type: 'packs/SET-IS-MY-PACKS', isMyPacks } as const)

//THUNKS =========================================

export const getPacksTC = (): AppThunkType => async (dispatch, getState) => {
  dispatch(setAppStatusAC('loading'))
  const { sort, pageCount, packName, isMyPacks, min, max, user_id } = getState().packs

  try {
    const response = await packsTableAPI.getPacks({
      sort,
      packName,
      isMyPacks,
      pageCount,
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

export const addNewPackTC = (): AppThunkType => async (dispatch, getState) => {
  dispatch(setAppStatusAC('loading'))
  const name = getState().packs.createPackName

  try {
    await packsTableAPI.createNewPack({ cardsPack: { name } })
    dispatch(getPacksTC())
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    errorUtils(err, dispatch)
    dispatch(setAppStatusAC('failed'))
  }
}

//TYPES ==========================================

type InitialStateType = {
  cardPacks: Array<CardPacksType>
  cardPacksTotalCount: number | null
  maxCardsCount: number | null
  minCardsCount: number | null
  page: number | null
  pageCount: number | null
  sort: string
  packName: string | null
  isMyPacks: boolean
  min: number
  max: number
  user_id: string | null
  createPackName: string
  token: string | null
}

// export type sortSettingsType = {
//   minCountCardsInPacks: number
//   maxCountCardsInPacks: number
//   searchValue: string
//   choosePacks: string
// }

export type packsReducerActionType =
  | setPacksDataACType
  | setMyPacksDataACType
  | setMinCardsCountACType
  | setMaxCardsCountACType
  | setSearchDataACType
  | changeSortACType
  | setUserIdACType
  | setIsMyPacksACType
export type setPacksDataACType = ReturnType<typeof setPacksDataAC>
export type setMyPacksDataACType = ReturnType<typeof setMyPacksDataAC>
export type setMinCardsCountACType = ReturnType<typeof setMinCardsCountAC>
export type setMaxCardsCountACType = ReturnType<typeof setMaxCardsCountAC>
export type setSearchDataACType = ReturnType<typeof setSearchDataAC>
export type changeSortACType = ReturnType<typeof changeSortAC>
export type setUserIdACType = ReturnType<typeof setUserIdAC>
export type setIsMyPacksACType = ReturnType<typeof setIsMyPacksAC>
