import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const cardsApi = {
  _getCards() {
    return instance.get('/cards/card', {
      params: {
        // cardAnswer: 'english',
        // cardQuestion: 'english',
        // cardsPack_id: '622b52e929bee9000469654f',
        cardsPack_id: '617ff51fd7b1030004090a1f',

        // min: 1,
        // max: 4,
        // sortCards: '0grade',
        // page: 1,
        // pageCount: 8,
      },
    })
  },
  getCards(pageCount: number, page: number) {
    return instance.get('/cards/card', {
      params: {
        // cardAnswer: 'english',
        // cardQuestion: 'english',
        // cardsPack_id: '622b52e929bee9000469654f',
        cardsPack_id: '617ff51fd7b1030004090a1f',

        // min: 1,
        // max: 4,
        // sortCards: '0grade',
        page: page,
        pageCount: pageCount,
      },
    })
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
