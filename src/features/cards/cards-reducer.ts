import { AppThunkType } from '../../app/store'

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
      // let flag = action.sort

      return { ...state, sort: Number(action.sort).toString() + 'grade' }
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

export const getCardsTC =
  (id?: string, debouncedSearchValue?: string): AppThunkType =>
  async (dispatch, getState) => {
    const { pageCount, page, sort } = getState().cards

    // const params = {
    //   cardsPack_id: '617ff51fd7b1030004090a1f',
    //   page: cardsState.page,
    //   pageCount: cardsState.pageCount,
    //   sortCards: cardsState.sort,
    // }
    let res

    if (debouncedSearchValue) {
      res = await cardsApi.getCards(pageCount, page, sort, id, debouncedSearchValue)
    } else {
      res = await cardsApi.getCards(pageCount, page, sort, id)
    }

    dispatch(setCardsAC(res?.data))
  }

// thunks

export const addNewCardTC = (): AppThunkType => async dispatch => {
  await cardsApi.addNewCard()
  // dispatch(getCardsTC())
}

export const editCardTC = (): AppThunkType => async dispatch => {
  await cardsApi.editCard()
  // dispatch(getCardsTC())
}

export const deleteCardTC = (): AppThunkType => async dispatch => {
  await cardsApi.deleteCard()
  // dispatch(getCardsTC())
}

// types

type setCardsACType = ReturnType<typeof setCardsAC>
type setPagePageCountACType = ReturnType<typeof setPagePageCountAC>
type toggleSortACType = ReturnType<typeof toggleSortAC>
export type cardsReducerActionsType = setCardsACType | setPagePageCountACType | toggleSortACType

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
