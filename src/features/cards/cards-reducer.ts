import { AxiosError } from 'axios'

import { cardsApi } from './cards-api'

import { RequestStatusType, setAppStatusAC } from 'app/app-reducer'
import { AppThunkType } from 'app/store'
import { errorUtils } from 'common/utils/error-utils'

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
    case 'cards/CHANGE-GRADE-SHOTS': {
      return {
        ...state,
        cards: state.cards.map(card =>
          card._id === action.card_id ? { ...card, grade: action.grade, shots: action.shots } : card
        ),
      }
    }
    case 'cards/CHANGE-ENTITY-STATUS': {
      return {
        ...state,
        cards: state.cards.map(card =>
          card._id === action.cardId ? { ...card, entityStatus: action.status } : card
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

export const changeGradeShotsAC = (grade: number, shots: number, card_id: string) =>
  ({ type: 'cards/CHANGE-GRADE-SHOTS', grade, shots, card_id } as const)

// thunks

export const getCardsTC =
  (pack_id?: string, debouncedSearchValue?: string): AppThunkType =>
  async (dispatch, getState) => {
    try {
      dispatch(setAppStatusAC('loading'))
      const { pageCount, page, sort } = getState().cards

      const res = debouncedSearchValue
        ? await cardsApi.getCards(pageCount, page, sort, pack_id, debouncedSearchValue)
        : await cardsApi.getCards(pageCount, page, sort, pack_id)

      dispatch(setCardsAC(res?.data))

      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }

export const addNewCardTC =
  (PackId: string, question?: string, answer?: string, img?: string): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      await cardsApi.addNewCard(PackId, question, answer, img)
      await dispatch(getCardsTC(PackId))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }

export const editCardTC =
  (
    CardId: string,
    packId?: string,
    question?: string,
    answer?: string,
    questionImg?: string
  ): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      dispatch(changeCardEntityStatusAC(CardId, 'loading'))

      await cardsApi.editCard(CardId, question, answer, questionImg)

      await dispatch(getCardsTC(packId))
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

      await dispatch(getCardsTC(packId))
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

      const response = await cardsApi.rateCard(grade, card_id)
      const gradeResponse = response.data.updatedGrade.grade
      const shots = response.data.updatedGrade.shots

      dispatch(changeGradeShotsAC(gradeResponse, shots, card_id))

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
type changeGradeShotsACType = ReturnType<typeof changeGradeShotsAC>

export type cardsReducerActionsType =
  | setCardsACType
  | setPagePageCountACType
  | toggleSortACType
  | changeCardEntityStatusACType
  | changeGradeShotsACType

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
}

export type ResponseGetCardsType = Omit<InitialStateType, 'sort' | 'search'>

export type CardType = {
  answer: string
  question: string
  questionImg?: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
  entityStatus?: RequestStatusType
}
