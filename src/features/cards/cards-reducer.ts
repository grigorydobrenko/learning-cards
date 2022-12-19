import { AxiosError } from 'axios'

import { setAppStatusAC } from '../../app/app-reducer'
import { AppThunkType } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'

import { cardsApi } from './cards-api'

const InitialState: InitialStateType = {
  cards: [],
  cardsTotalCount: null,
  maxGrade: null,
  minGrade: null,
  page: null,
  pageCount: null,
  packUserId: null,
}

export const cardsReducer = (
  state: InitialStateType = InitialState,
  action: cardsReducerActionsType
): InitialStateType => {
  switch (action.type) {
    case 'cards/SET-CARDS':
      return { ...state, cards: action.cards }

    default:
      return state
  }
}

export const setCardsAC = (cards: CardType[]) => ({ type: 'cards/SET-CARDS', cards } as const)

export const getCardsTC = (): AppThunkType => async dispatch => {
  try {
    const res = await cardsApi.getCards()

    dispatch(setCardsAC(res.data.cards))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    errorUtils(err, dispatch)
    dispatch(setAppStatusAC('failed'))
  }
}

type setCardsACType = ReturnType<typeof setCardsAC>
export type cardsReducerActionsType = setCardsACType

type InitialStateType = {
  cards: CardType[]
  cardsTotalCount: number | null
  maxGrade: number | null
  minGrade: number | null
  page: number | null
  pageCount: number | null
  packUserId: string | null
}

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
