import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  // process.env.NODE_ENV === 'development'
  //   ? 'http://localhost:7542/2.0/'
  //   : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const packsTableAPI = {
  getPacks() {
    return instance.get<'', AxiosResponse<PackResponseType>, PacksRequestType>(
      'cards/pack'
      // data
    )
  },
  createNewPack() {
    return instance.post<'', AxiosResponse<PackResponseType>, CreatePacksRequestType>(
      '/cards/pack',
      { name: 'New Pack', deckCover: 'url or base64' }
    )
  },
}

//TYPES================================================
export type CreatePacksRequestType = {
  name: string
  deckCover: string
}
export type PackResponseType = {
  cardPacks: Array<CardPacksType>
  cardPacksTotalCount: number | null
  maxCardsCount: number | null
  minCardsCount: number | null
  page: number | null
  pageCount: number | null
  token: string
  tokenDeathTime: number | null
}

export type CardPacksType = {
  cardsCount: number
  created: string
  deckCover: null | number
  grade: number
  more_id: string
  name: string
  path: string
  private: boolean
  rating: number
  shots: number
  type: string
  updated: string
  user_id: string
  user_name: string
  __v: number
  _id: string
}

export type PacksRequestType = {
  packName: string // не обязательно
  min: number // не обязательно
  max: number // не обязательно
  sortPacks: string // не обязательно
  page: number // не обязательно
  pageCount: number // не обязательно
  user_id: string // не обязательно
  block: boolean // не обязательно
}
