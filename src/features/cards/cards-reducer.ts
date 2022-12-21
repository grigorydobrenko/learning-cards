import { AxiosError } from 'axios'

import { setAppStatusAC } from '../../app/app-reducer'
import { AppThunkType } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'

import { cardsApi } from './cards-api'

const InitialState: InitialStateType = {
  cards: [],
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  page: 0,
  pageCount: 0,
  sort: '',
  search: '',
  packUserId: '',
  isMyPack: null,
}

export const cardsReducer = (
  state: InitialStateType = InitialState,
  action: cardsReducerActionsType
): InitialStateType => {
  switch (action.type) {
    case 'cards/SET-CARDS':
      return { ...state, ...action.cardsResponse }
    case 'cards/SET-PAGE-COUNT':
      return { ...state, pageCount: action.pageCount, page: action.page }

    default:
      return state
  }
}

// export const setCardsAC = (cards: CardType[], cardsTotalCount: number) =>
//   ({ type: 'cards/SET-CARDS', cards, cardsTotalCount } as const)
export const setCardsAC = (cardsResponse: ResponseGetCardsType) =>
  ({ type: 'cards/SET-CARDS', cardsResponse } as const)

export const setPagePageCountAC = (pageCount: number, page: number) =>
  ({ type: 'cards/SET-PAGE-COUNT', pageCount, page } as const)

export const _getCardsTC = (): AppThunkType => async dispatch => {
  try {
    dispatch(setAppStatusAC('loading'))
    const res = await cardsApi._getCards()

    dispatch(setCardsAC(res.data))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    errorUtils(err, dispatch)
    dispatch(setAppStatusAC('failed'))
  }
}

export const getCardsTC = (): AppThunkType => async (dispatch, getState) => {
  const { pageCount, page } = getState().cards

  const res = await cardsApi.getCards(pageCount, page)

  // dispatch(setPagePageCountAC(res.data.pageCount, res.data.page))
  dispatch(setCardsAC(res.data))
}

type setCardsACType = ReturnType<typeof setCardsAC>
type setPagePageCountACType = ReturnType<typeof setPagePageCountAC>
export type cardsReducerActionsType = setCardsACType | setPagePageCountACType

type InitialStateType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
  sort: string
  search: string
  isMyPack: boolean | null
}

type ResponseGetCardsType = Omit<InitialStateType, 'sort' | 'search' | 'isMyPack'>

export type CardType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}
