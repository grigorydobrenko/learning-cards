import { AxiosError } from 'axios'

import { setAppStatusAC } from '../../app/app-reducer'
import { AppThunkType } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'

import { CardPacksType, PacksResponseType, packsTableAPI } from './packs-api'

const InitialState: InitialStateType = {
  cardPacks: [],
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 1,
  pageCount: 50,
  sortPacks: '0updated',
  packName: null,
  updatedPackName: 'Pack updated!',
  isMyPacks: false,
  min: 0,
  max: 20,
  user_id: '',
  token: '',
  createPackName: 'NEw pack',
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
    case 'packs/SET-NEW-PACK-NAME':
      return { ...state, updatedPackName: action.newPackName }
    case 'packs/CHANGE-SORT':
      return { ...state, sortPacks: action.sortData }
    case 'packs/SET-USER-ID':
      return { ...state, user_id: action.user_id }
    case 'packs/SET-IS-MY-PACKS':
      return { ...state, isMyPacks: action.isMyPacks }
    case 'packs/SET-PAGE-PACKS-COUNT':
      return { ...state, pageCount: action.pageCount, page: action.page }

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
export const setSearchDataAC = (packName: string | null) =>
  ({ type: 'packs/SET-SEARCH-DATA', packName } as const)
export const setNewPackNameAC = (newPackName: string) =>
  ({ type: 'packs/SET-NEW-PACK-NAME', newPackName } as const)
export const changeSortAC = (sortData: string) => ({ type: 'packs/CHANGE-SORT', sortData } as const)
export const setUserIdAC = (user_id: string) => ({ type: 'packs/SET-USER-ID', user_id } as const)
export const setIsMyPacksAC = (isMyPacks: boolean) =>
  ({ type: 'packs/SET-IS-MY-PACKS', isMyPacks } as const)
export const setPagePacksCountAC = (pageCount: number, page: number) =>
  ({ type: 'packs/SET-PAGE-PACKS-COUNT', pageCount, page } as const)

//THUNKS =========================================

export const getPacksTC = (): AppThunkType => async (dispatch, getState) => {
  dispatch(setAppStatusAC('loading'))
  let { sortPacks, pageCount, page, packName, min, max, user_id } = getState().packs

  try {
    const response = await packsTableAPI.getPacks({
      sortPacks,
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

export const deletePackTC =
  (id: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))

    try {
      await packsTableAPI.deletePack(id)
      dispatch(getPacksTC())
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }

export const updatePackTC =
  (_id: string): AppThunkType =>
  async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    let name = getState().packs.updatedPackName

    try {
      await packsTableAPI.updatePack({ cardsPack: { _id, name } })
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
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
  sortPacks: string
  packName: string | null
  updatedPackName: string
  isMyPacks: boolean
  min: number
  max: number
  user_id: string
  createPackName: string
  token: string | null
}

export type packsReducerActionType =
  | setPacksDataACType
  | setMyPacksDataACType
  | setMinCardsCountACType
  | setMaxCardsCountACType
  | setSearchDataACType
  | changeSortACType
  | setUserIdACType
  | setIsMyPacksACType
  | setPagePacksCountACType
  | setNewPackNameACType
export type setPacksDataACType = ReturnType<typeof setPacksDataAC>
export type setMyPacksDataACType = ReturnType<typeof setMyPacksDataAC>
export type setMinCardsCountACType = ReturnType<typeof setMinCardsCountAC>
export type setMaxCardsCountACType = ReturnType<typeof setMaxCardsCountAC>
export type setSearchDataACType = ReturnType<typeof setSearchDataAC>
export type changeSortACType = ReturnType<typeof changeSortAC>
export type setUserIdACType = ReturnType<typeof setUserIdAC>
export type setIsMyPacksACType = ReturnType<typeof setIsMyPacksAC>
export type setPagePacksCountACType = ReturnType<typeof setPagePacksCountAC>
export type setNewPackNameACType = ReturnType<typeof setNewPackNameAC>
