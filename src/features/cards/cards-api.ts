import axios from 'axios'

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
    return instance.get('/cards/card', {
      params: {
        // cardAnswer: 'english',
        cardQuestion: debouncedSearchValue,
        cardsPack_id: pack_id,
        // cardsPack_id: cardsPack_id,

        // min: 1,
        // max: 4,
        sortCards: sort,
        page: page,
        pageCount: pageCount,
      },
    })
  },
  addNewCard(id?: string, question?: string, answer?: string) {
    const data = {
      card: {
        cardsPack_id: id,
        question,
        answer,
      },
    }

    return instance.post('/cards/card', data)
  },

  editCard(id: string, question?: string, answer?: string) {
    const data = {
      card: {
        _id: id,
        question,
        answer,
      },
    }

    return instance.put(`/cards/card`, data)
  },

  deleteCard(id: string) {
    return instance.delete(`/cards/card?id=${id}`)
  },
}

// type CardsPayloadType = {
//     ?cardAnswer=english // не обязательно
//     &cardQuestion=english // не обязательно
//     &cardsPack_id=5eb6a2f72f849402d46c6ac7
//     &min=1 // не обязательно
//     &max=4 // не обязательно
//     &sortCards=0grade // не обязательно
//     &page=1 // не обязательно
//     &pageCount=7 // не обязательно
//
// }
