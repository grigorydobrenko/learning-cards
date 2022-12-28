import axios, { AxiosResponse } from 'axios'

import { ResponseGetCardsType } from './cards-reducer'

const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const cardsApi = {
  getCards(
    pageCount: number,
    page: number,
    sort: string,
    pack_id?: string,
    debouncedSearchValue?: string
  ) {
    return instance.get<ResponseGetCardsType>('/cards/card', {
      params: {
        cardQuestion: debouncedSearchValue,
        cardsPack_id: pack_id,
        sortCards: sort,
        page: page,
        pageCount: pageCount,
      },
    })
  },

  addNewCard(id: string, question?: string, answer?: string) {
    const data = {
      card: {
        cardsPack_id: id,
        question,
        answer,
      },
    }

    return instance.post<'', '', AddCardPayload>('/cards/card', data)
  },

  editCard(id: string, question?: string, answer?: string) {
    const data = {
      card: {
        _id: id,
        question,
        answer,
      },
    }

    return instance.put<'', '', UpdateCardPayload>(`/cards/card`, data)
  },

  deleteCard(id: string) {
    return instance.delete(`/cards/card?id=${id}`)
  },

  rateCard(grade: number, card_id: string) {
    return instance.put<'', AxiosResponse<UpdateGradeResponse>, UpdateGradePayload>(
      `/cards/grade`,
      { grade, card_id }
    )
  },
}

// types

type AddCardPayload = {
  card: AddPaylod
}

type UpdateCardPayload = {
  card: UpdatePaylod
}

type Paylod = {
  _id: string
  cardsPack_id: string
  question?: string
  answer?: string
}

type AddPaylod = Omit<Paylod, '_id'>
type UpdatePaylod = Omit<Paylod, 'cardsPack_id'>

type UpdateGradePayload = {
  grade: number
  card_id: string
}

type UpdateGradeResponse = {
  updatedGrade: {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
  }
}
