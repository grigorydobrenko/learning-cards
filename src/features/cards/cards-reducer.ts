import { AxiosError } from 'axios'

import { RequestStatusType, setAppStatusAC } from '../../app/app-reducer'
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
  packName: 'My Pack',
  isMyPack: true,
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
    case 'cards/TOGGLE-SORT': {
      return { ...state, sort: Number(action.sort).toString() + 'grade' }
    }
    case 'cards/CHANGE-ENTITY-STATUS': {
      return {
        ...state,
        cards: state.cards.map(card =>
          card._id === action.cardId ? { ...card, entityStatus: 'loading' } : card
        ),
      }
    }

    default:
      return state
  }
}

// actions

export const setCardsAC = (cardsResponse: ResponseGetCardsType) =>
  ({ type: 'cards/SET-CARDS', cardsResponse } as const)

export const setPagePageCountAC = (pageCount: number, page: number) =>
  ({ type: 'cards/SET-PAGE-COUNT', pageCount, page } as const)

export const toggleSortAC = (sort: boolean) => ({ type: 'cards/TOGGLE-SORT', sort } as const)

export const changeCardEntityStatusAC = (cardId: string, status: RequestStatusType) =>
  ({ type: 'cards/CHANGE-ENTITY-STATUS', cardId, status } as const)

// thunks

export const getCardsTC =
  (pack_id?: string, debouncedSearchValue?: string): AppThunkType =>
  async (dispatch, getState) => {
    try {
      dispatch(setAppStatusAC('loading'))
      const { pageCount, page, sort } = getState().cards

      let res

      if (debouncedSearchValue) {
        res = await cardsApi.getCards(pageCount, page, sort, pack_id, debouncedSearchValue)
      } else {
        res = await cardsApi.getCards(pageCount, page, sort, pack_id)
      }
      dispatch(setCardsAC(res?.data))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }

export const addNewCardTC =
  (PackId?: string, question?: string, answer?: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      await cardsApi.addNewCard(PackId, question, answer)
      dispatch(getCardsTC(PackId))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }

export const editCardTC =
  (CardId: string, packId?: string, question?: string, answer?: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      dispatch(changeCardEntityStatusAC(CardId, 'loading'))

      await cardsApi.editCard(CardId, question, answer)

      dispatch(getCardsTC(packId))
      dispatch(setAppStatusAC('succeeded'))
      dispatch(changeCardEntityStatusAC(CardId, 'succeeded'))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
      dispatch(setAppStatusAC('failed'))
      dispatch(changeCardEntityStatusAC(CardId, 'failed'))
    }
  }

export const deleteCardTC =
  (CardId: string, packId?: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      dispatch(changeCardEntityStatusAC(CardId, 'loading'))

      await cardsApi.deleteCard(CardId)

      dispatch(getCardsTC(packId))
      dispatch(setAppStatusAC('succeeded'))
      dispatch(changeCardEntityStatusAC(CardId, 'succeeded'))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
      dispatch(setAppStatusAC('failed'))
      dispatch(changeCardEntityStatusAC(CardId, 'failed'))
    }
  }

export const rateCardTC =
  (grade: number, card_id: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))

      await cardsApi.rateCard(grade, card_id)

      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }

// types

type setCardsACType = ReturnType<typeof setCardsAC>
type setPagePageCountACType = ReturnType<typeof setPagePageCountAC>
type toggleSortACType = ReturnType<typeof toggleSortAC>
type changeCardEntityStatusACType = ReturnType<typeof changeCardEntityStatusAC>

export type cardsReducerActionsType =
  | setCardsACType
  | setPagePageCountACType
  | toggleSortACType
  | changeCardEntityStatusACType

type InitialStateType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
  packName: string
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
  entityStatus?: RequestStatusType
}
