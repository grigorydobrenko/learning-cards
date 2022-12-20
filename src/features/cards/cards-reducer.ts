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
  page: 1,
  pageCount: 5,
  sort: '0grade',
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
      return {
        ...state,
        cards: action.cardsResponse.cards,
        cardsTotalCount: action.cardsResponse.cardsTotalCount,
      }
    case 'cards/SET-PAGE-COUNT':
      return { ...state, pageCount: action.pageCount }
    case 'cards/SET-PAGE':
      return { ...state, page: action.page }
    case 'cards/SET-SORT':
      return { ...state, sort: action.sort }

    default:
      return state
  }
}

// export const setCardsAC = (cards: CardType[], cardsTotalCount: number) =>
//   ({ type: 'cards/SET-CARDS', cards, cardsTotalCount } as const)
export const setCardsAC = (cardsResponse: ResponseGetCardsType) =>
  ({ type: 'cards/SET-CARDS', cardsResponse } as const)
export const setPageCountAC = (pageCount: number) =>
  ({ type: 'cards/SET-PAGE-COUNT', pageCount } as const)
export const setPageAC = (page: number) => ({ type: 'cards/SET-PAGE', page } as const)
export const setCardsSortAC = (sort: string) => ({ type: 'cards/SET-SORT', sort } as const)

export const getCardsTC = (): AppThunkType => async (dispatch, getState) => {
  const cardsState = getState().cards
  const params = {
    cardsPack_id: '617ff51fd7b1030004090a1f',
    page: cardsState.page,
    pageCount: cardsState.pageCount,
    sortCards: cardsState.sort,
  }
  try {
    dispatch(setAppStatusAC('loading'))
    const res = await cardsApi.getCards(params)

    dispatch(setCardsAC(res.data))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    errorUtils(err, dispatch)
    dispatch(setAppStatusAC('failed'))
  }
}

type setCardsACType = ReturnType<typeof setCardsAC>
type setPageCountACType = ReturnType<typeof setPageCountAC>
type setPageACType = ReturnType<typeof setPageAC>
type setCardsSortACType = ReturnType<typeof setCardsSortAC>
export type cardsReducerActionsType =
  | setCardsACType
  | setPageCountACType
  | setPageACType
  | setCardsSortACType

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
