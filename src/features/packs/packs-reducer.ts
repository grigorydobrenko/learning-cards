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
  pageCount: 10,
  sort: '0updated',
  search: null,
  isMyPacks: false,
  minCountCardsInPacks: 0,
  maxCountCardsInPacks: 20,
}

export const packsReducer = (
  state: InitialStateType = InitialState,
  action: packsReducerActionType
): InitialStateType => {
  switch (action.type) {
    case 'packs/SET-PACKS':
      return { ...state, ...action.data }
    case 'packs/SET-MY-PACKS':
      return { ...state, isMyPacks: action.isMyPacks }
    case 'packs/SET-MIN-CARDS-COUNT':
      return { ...state, minCountCardsInPacks: action.minCount }
    case 'packs/SET-MAX-CARDS-COUNT':
      return { ...state, maxCountCardsInPacks: action.maxCount }
    case 'packs/SET-SEARCH-DATA':
      return { ...state, search: action.searchData }
    case 'packs/CHANGE-SORT':
      return { ...state, sort: action.sortData }
    default:
      return state
  }
}

//ACTIONS========================================

export const setPacksDataAC = (data: PacksResponseType) =>
  ({ type: 'packs/SET-PACKS', data } as const)
export const setMyPacksDataAC = (isMyPacks: boolean) =>
  ({ type: 'packs/SET-MY-PACKS', isMyPacks } as const)
export const setMinCardsCountAC = (minCount: number | null) =>
  ({ type: 'packs/SET-MIN-CARDS-COUNT', minCount } as const)
export const setMaxCardsCountAC = (maxCount: number) =>
  ({ type: 'packs/SET-MAX-CARDS-COUNT', maxCount } as const)
export const setSearchDataAC = (searchData: string) =>
  ({ type: 'packs/SET-SEARCH-DATA', searchData } as const)
export const changeSortAC = (sortData: string) => ({ type: 'packs/CHANGE-SORT', sortData } as const)

//THUNKS =========================================

export const getPacksTC = (): AppThunkType => async (dispatch, getState) => {
  dispatch(setAppStatusAC('loading'))
  const { sort, pageCount, search, isMyPacks, minCountCardsInPacks, maxCountCardsInPacks } =
    getState().packs

  try {
    const response = await packsTableAPI.getPacks({
      sort,
      search,
      isMyPacks,
      pageCount,
      minCountCardsInPacks,
      maxCountCardsInPacks,
    })

    dispatch(setPacksDataAC(response.data))

    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    errorUtils(err, dispatch)
    dispatch(setAppStatusAC('failed'))
  }
}

export const addNewPackTC = (): AppThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const response = await packsTableAPI.createNewPack()

    dispatch(setPacksDataAC(response.data))

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
  search: string | null
  isMyPacks: boolean
  minCountCardsInPacks: number | null
  maxCountCardsInPacks: number | null
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
export type setPacksDataACType = ReturnType<typeof setPacksDataAC>
export type setMyPacksDataACType = ReturnType<typeof setMyPacksDataAC>
export type setMinCardsCountACType = ReturnType<typeof setMinCardsCountAC>
export type setMaxCardsCountACType = ReturnType<typeof setMaxCardsCountAC>
export type setSearchDataACType = ReturnType<typeof setSearchDataAC>
export type changeSortACType = ReturnType<typeof changeSortAC>
