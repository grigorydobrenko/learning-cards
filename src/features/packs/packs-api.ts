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
  getPacks({ sortPacks, packName, pageCount, page, min, max, user_id }: PacksPayloadType) {
    return instance.get<'', AxiosResponse<PacksResponseType>, PacksPayloadType>('cards/pack', {
      params: {
        sortPacks,
        packName,
        pageCount,
        page,
        min,
        max,
        user_id,
      },
    })
  },

  createNewPack({ cardsPack: { name } }: CreatePacksRequestType) {
    return instance.post<'', AxiosResponse<PacksResponseType>, CreatePacksRequestType>(
      '/cards/pack',
      { cardsPack: { name } }
    )
  },

  deletePack(id: DeletePackRequestType) {
    return instance.delete<'', AxiosResponse<PacksResponseType>, DeletePackRequestType>(
      '/cards/pack'
    )
  },
}

//TYPES================================================
type DeletePackRequestType = {
  id: string
}
export type CreatePacksRequestType = {
  cardsPack: {
    name: string | null
    userId?: string
    deckCover?: string
  }
}
export type PacksResponseType = {
  cardPacks: Array<CardPacksType>
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
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
export type PacksPayloadType = {
  sortPacks: string | null
  packName: string | null
  min: number | null
  max: number | null
  pageCount: number | null
  page: number
  user_id: string | null
}
