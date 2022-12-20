import { AxiosError } from 'axios'

import { setAppStatusAC } from '../../app/app-reducer'
import { AppThunkType } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'

import { cardPacksType, PackResponseType, PacksRequestType, packsTableAPI } from './packs-api'

const InitialState: InitialStateType = {
  cardPacks: [],
  settings: {},
  cardPacksTotalCount: null,
  maxCardsCount: null,
  minCardsCount: null,
  page: null,
  pageCount: null,
  token: '',
  tokenDeathTime: null,
}

export const packsReducer = (
  state: InitialStateType = InitialState,
  action: packsReducerActionType
): InitialStateType => {
  switch (action.type) {
    case 'packs/SET-PACKS':
      return { ...state, ...action.data }
    default:
      return state
  }
}

//ACTIONS========================================
export const setPacksDataAC = (data: PackResponseType) =>
  ({ type: 'packs/SET-PACKS', data } as const)

//THUNKS =========================================

export const getPacksTC = (): AppThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  // const requestData: PacksRequestType = {
  //   packName: 'english',
  //   min: 3,
  //   max: 22,
  //   sortPacks: '0updated',
  //   page: 1,
  //   pageCount: 10,
  //   user_id: '',
  //   block: false,
  // }

  try {
    const response = await packsTableAPI.getPacks()

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
  cardPacks: Array<cardPacksType>
  settings: Partial<PacksRequestType>
  cardPacksTotalCount: number | null
  maxCardsCount: number | null
  minCardsCount: number | null
  page: number | null
  pageCount: number | null
  token: string
  tokenDeathTime: number | null
}

export type packsReducerActionType = setPacksDataACType
export type setPacksDataACType = ReturnType<typeof setPacksDataAC>
