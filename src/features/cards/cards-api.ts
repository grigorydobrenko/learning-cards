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
    id?: string,
    debouncedSearchValue?: string
  ) {
    return instance.get('/cards/card', {
      params: {
        // cardAnswer: 'english',
        cardQuestion: debouncedSearchValue,
        cardsPack_id: id,
        // cardsPack_id: cardsPack_id,

        // min: 1,
        // max: 4,
        sortCards: sort,
        page: page,
        pageCount: pageCount,
      },
    })
  },
  addNewCard() {
    const data = {
      cardsPack_id: '5eb543f6bea3ad21480f1ee7',
    }

    return instance.post('/cards/card', data)
  },

  editCard() {
    const data = {
      cardsPack_id: '5eb543f6bea3ad21480f1ee7',
    }

    return instance.put(`/cards/card`, data)
  },

  deleteCard() {
    return instance.delete(`/cards/card?id=5eb6cb9a7a82672138e0d7c1`)
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
