import axios, { AxiosResponse } from 'axios'

import { CardPacksType } from './packs-reducer'

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  // process.env.NODE_ENV === 'development'
  //   ? 'http://localhost:7542/2.0/'
  //   : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const packsTableAPI = {
  getPacks({ packName, pageCount, page, min, max, user_id }: PacksPayloadType) {
    return instance.get<'', AxiosResponse<PacksResponseType>, PacksPayloadType>('cards/pack', {
      params: {
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
    return instance.post<CreatePacksRequestType>('/cards/pack', { cardsPack: { name } })
  },

  deletePack(id: string) {
    return instance.delete<DeletePackRequestType>(`/cards/pack?id=${id}`)
  },

  updatePack({ cardsPack: { _id, name } }: UpdatePackNameType) {
    return instance.put<'', AxiosResponse<PacksResponseType>, UpdatePackNameType>(
      // `/cards/pack?id=${id}&name=${newPackName}`
      '/cards/pack',
      { cardsPack: { _id, name } }
    )
  },
}

//TYPES================================================
type UpdatePackNameType = {
  cardsPack: {
    _id: string
    name: string
  }
}
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

export type PacksPayloadType = {
  packName: string | null
  min: number | null
  max: number | null
  pageCount: number | null
  page: number
  user_id: string
}
