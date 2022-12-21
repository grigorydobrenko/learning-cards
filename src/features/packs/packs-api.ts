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
  getPacks({}: // sort,
  // search,
  //isMyPacks,
  // minCountCardsInPacks,
  // maxCountCardsInPacks,
  PacksRequestType) {
    return instance.get<'', AxiosResponse<PacksResponseType>, PacksRequestType>('cards/pack', {
      // sort,
      // search,
      // isMyPacks,
      // minCountCardsInPacks,
      // maxCountCardsInPacks,
    })
  },
  createNewPack() {
    return instance.post<'', AxiosResponse<PacksResponseType>, CreatePacksRequestType>(
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
export type PacksResponseType = {
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
  // sort: string
  // search: string | null
  isMyPacks: boolean
  // minCountCardsInPacks: number | null
  // maxCountCardsInPacks: number | null
}
